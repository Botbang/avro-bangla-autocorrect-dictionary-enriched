# Avro Bangla Autocorrect Dictionary

An enriched autocorrect dictionary for [Avro Keyboard](https://www.omicronlab.com/avro-keyboard.html), curated to make everyday Bangla typing faster and more reliable.

[![Dictionary entries](https://img.shields.io/badge/unique%20input%20keys-5%2C495-0b6bcb)](./autodict.dct)
[![Source book](https://img.shields.io/badge/source-book%20included-e7a72e)](./books/government-standard-bangla-and-practical-bangla-2nd-edition.pdf)
[![Website](https://img.shields.io/badge/GitHub%20Pages-visit-167d71)](https://afnan-hossain.github.io/avro-bangla-autocorrect-dictionary-enriched/)

## About the project

Avro Keyboard's bundled autocorrect dictionary is useful but limited for the breadth and complexity of Bangla spelling. This project expands it with commonly used words, frequently confused spellings, and selected English-to-Bangla entries.

The current dictionary contains **5,495 unique input keys**. It is distributed in Avro's importable `autodict.dct` format.

> This work is a tribute to the creator and developers of Avro Keyboard.

## Source-book foundation

This project's systematic enrichment work follows the second-edition government reference volume containing:

- **সরকারি কাজে প্রমিত বাংলা ব্যবহারের নিয়ম**
- **সরকারি কাজে ব্যবহারিক বাংলা**

The volume was published by the **Bangla Language Implementation Cell, Reform and Research Division, Ministry of Public Administration, Bangladesh Secretariat, Dhaka**. A copy of the exact source volume used by this project is included for transparency and reproducibility.

[Read or download the source book (PDF)](./books/government-standard-bangla-and-practical-bangla-2nd-edition.pdf)

The book uses a legacy ANSI Bangla font. Its text therefore requires visual OCR and verification; embedded PDF text is not treated as authoritative.

## Downloads

| File | Purpose |
| --- | --- |
| [`autodict.dct`](./autodict.dct?raw=1) | Importable Avro autocorrect dictionary |
| [Government Bangla reference, 2nd edition](./books/government-standard-bangla-and-practical-bangla-2nd-edition.pdf?raw=1) | Source book used for systematic enrichment |

## Install in Avro Keyboard

1. Right-click the Avro icon.
2. Open **Tools → Avro Phonetic Options → Edit/Import Auto Correct Entries**.
3. Enable **Dictionary mode is default in suggestion** and **Enable Auto Correct**.
4. Select **Import**, choose `autodict.dct`, and confirm.

![Open Avro's autocorrect settings](./shot%201.png)

![Import the dictionary file](./shot%202.png)

> Avro warns against editing this format by hand. Import the file through Avro's interface unless you understand its internal phonetic representation.

## Update history

| Date | Words added |
| --- | ---: |
| 2023-12-06 | 209 |
| 2022-05-10 | 250 |
| 2021-05-04 | 1,469 |
| 2021-05-02 | 1,000 |

The source-book enrichment is the next major expansion and is being processed with OCR plus manual-quality validation.

## Project links

- [Project website](https://afnan-hossain.github.io/avro-bangla-autocorrect-dictionary-enriched/)
- [Report an issue](https://github.com/afnan-hossain/avro-bangla-autocorrect-dictionary-enriched/issues)
- [BOTBANG on Facebook](https://www.facebook.com/afnan.hossain.0)

© 2026 Afnan Hossain / BOTBANG. Avro Keyboard and the source publication belong to their respective owners and publishers.
