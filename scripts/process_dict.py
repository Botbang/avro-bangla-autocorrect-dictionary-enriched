#!/usr/bin/env python3
"""Process Avro autocorrect dictionary: encoding fix, dedupe, normalize, merge vocab."""

from __future__ import annotations

import argparse
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_DICT = ROOT / "autodict.dct"
DEFAULT_VOCAB = ROOT / "data" / "academic_vocab.txt"

# Windows-1252 bytes that differ from Latin-1 / need Unicode mapping in emoticon rows.
CP1252_OVERRIDES = {
    0x80: "\u20ac",
    0x82: "\u201a",
    0x83: "\u0192",
    0x84: "\u201e",
    0x85: "\u2026",
    0x86: "\u2020",
    0x87: "\u2021",
    0x88: "\u02c6",
    0x89: "\u2030",
    0x8A: "\u0160",
    0x8B: "\u2039",
    0x8C: "\u0152",
    0x8E: "\u017d",
    0x91: "\u2018",
    0x92: "\u2019",
    0x93: "\u201c",
    0x94: "\u201d",
    0x95: "\u2022",
    0x96: "\u2013",
    0x97: "\u2014",
    0x98: "\u02dc",
    0x99: "\u2122",
    0x9A: "\u0161",
    0x9B: "\u203a",
    0x9C: "\u0153",
    0x9E: "\u017e",
    0x9F: "\u0178",
}


def decode_legacy(text: str) -> str:
    """Convert Latin-1 read of CP1252 file into proper Unicode."""
    return "".join(CP1252_OVERRIDES.get(ord(ch), ch) for ch in text)


def normalize_text(text: str) -> str:
    return unicodedata.normalize("NFC", text)


def is_placeholder_entry(key: str, value: str) -> bool:
    """Drop corrupt placeholder rows like ??????????."""
    if set(key) <= {"?"} or set(value) <= {"?"}:
        return True
    return False


def parse_header_and_entries(lines: list[str]) -> tuple[list[str], list[tuple[str, str]]]:
    header: list[str] = []
    entries: list[tuple[str, str]] = []
    in_header = True

    for line in lines:
        raw = line.rstrip("\n\r")
        if in_header and (raw.startswith("/") or raw.strip() == ""):
            header.append(raw)
            continue
        in_header = False
        if not raw.strip():
            continue
        parts = raw.split(None, 1)
        if len(parts) != 2:
            continue
        entries.append((parts[0], parts[1]))
    return header, entries


def load_vocab(path: Path) -> list[tuple[str, str]]:
    pairs: list[tuple[str, str]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split(None, 1)
        if len(parts) == 2:
            pairs.append((parts[0], parts[1]))
    return pairs


def process_dictionary(
    dict_path: Path,
    vocab_path: Path,
    dry_run: bool = False,
) -> dict[str, int]:
    raw_lines = dict_path.read_text(encoding="latin-1").splitlines(keepends=True)
    decoded_lines = [decode_legacy(line.rstrip("\n\r")) + "\n" for line in raw_lines]

    header, entries = parse_header_and_entries([line.rstrip("\n\r") for line in decoded_lines])

    stats = {
        "original_entries": len(entries),
        "removed_placeholders": 0,
        "removed_duplicates": 0,
        "added_vocab": 0,
        "skipped_existing": 0,
        "final_entries": 0,
    }

    cleaned: list[tuple[str, str]] = []
    seen_keys: set[str] = set()

    for key, value in entries:
        key = normalize_text(key)
        value = normalize_text(value)
        if is_placeholder_entry(key, value):
            stats["removed_placeholders"] += 1
            continue
        if key in seen_keys:
            stats["removed_duplicates"] += 1
            continue
        seen_keys.add(key)
        cleaned.append((key, value))

    vocab = load_vocab(vocab_path)
    new_entries: list[tuple[str, str]] = []
    for key, value in vocab:
        key = normalize_text(key)
        value = normalize_text(value)
        if key in seen_keys:
            stats["skipped_existing"] += 1
            continue
        seen_keys.add(key)
        new_entries.append((key, value))
        stats["added_vocab"] += 1

    final = cleaned + new_entries
    stats["final_entries"] = len(final)

    if not dry_run:
        out_lines = header + [f"{k} {v}" for k, v in final]
        dict_path.write_text("\n".join(out_lines) + "\n", encoding="utf-8", newline="\n")

    return stats


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dict", type=Path, default=DEFAULT_DICT)
    parser.add_argument("--vocab", type=Path, default=DEFAULT_VOCAB)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not args.dict.exists():
        print(f"Dictionary not found: {args.dict}", file=sys.stderr)
        return 1
    if not args.vocab.exists():
        print(f"Vocab file not found: {args.vocab}", file=sys.stderr)
        return 1

    stats = process_dictionary(args.dict, args.vocab, dry_run=args.dry_run)
    for key, value in stats.items():
        print(f"{key}: {value}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
