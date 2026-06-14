# avro-bangla-autocorrect-dictionary
The Avro Keyboard is a blessing when it comes to typing in Bangla. However, the built-in autocorrect dictionary in the Avro keyboard doesn't contain enough words (2473 words to be exact). And, considering the huge volume and the complex spelling rules of Bangla words, it's not quite handy when someone is typing fast or doesn't know enough about Bangla spelling. So, this is my tiny approach to enriching the autocorrect dictionary. This file contains the correct spellings of the most commonly used Bangla words (and the words that are generally mistaken).<br> 

It also contains the Bangla spelling of some commonly used English words. So, if you're not sure about the Bangla spelling of an English word, just type it in English (if the file contains the word, it'll give you the correct spelling).<br>

***

> <I>This work is a tribute to the creator and the developers of the Avro Keyboard.</I> 

***

<h3>Update log:</h3>
<I>update: 14-06-26, <b>470</b> new academic words added (NSTU/university batch + dedupe/encoding pass)</I><br>
<I>update: 06-12-23, <b>209</b> new words added</I><br>
<I>update: 10-05-22, <b>250</b> new words added</I><br>
<I>update: 04-05-21, <b>1469</b> new words added</I><br>
<I>update: 02-05-21, <b>1000</b> new words added</I><br>
<I>Current dictionary size: <b>5952 words</b></I><br>

***

<h3>Sourcing methodology (Bangla IME ecosystem)</h3>

This dictionary is maintained for the <a href="https://omicronlab.com/avro-keyboard.html">Avro Keyboard</a> autocorrect pipeline. Each line maps a typed key (misspelling or English input) to a corrected Avro phonetic romanization value.

<b>How entries are sourced</b>
<ul>
  <li><b>Base corpus</b> — Original enriched dictionary by <a href="https://github.com/afnan-hossain/avro-bangla-autocorrect-dictionary-enriched">afnan-hossain/avro-bangla-autocorrect-dictionary-enriched</a>, built from common Bangla typing mistakes and everyday vocabulary.</li>
  <li><b>Academic/NSTU batch</b> — Curated in <code>data/academic_vocab.txt</code> from Bangladeshi university terminology: faculty/department names, exam and research terms, BEN205-aligned Bangla grammar &amp; literature vocabulary, and frequent academic English→Bangla mappings.</li>
  <li><b>Reference checks</b> — Avro phonetic rules (OmicronLab keymap), NSTU/NSU public course syllabi for subject coverage, and cross-checks against existing <code>autodict.dct</code> keys to avoid duplicates.</li>
  <li><b>Quality pass</b> — Unicode NFC normalization, legacy CP1252 emoticon-byte repair, placeholder-row removal, and key-level deduplication via <code>scripts/process_dict.py</code>.</li>
</ul>

<b>Regenerating the dictionary</b>
<pre>
python scripts/build_vocab.py
python scripts/process_dict.py
</pre>

***

<h1>To use the Dictionary file</h1>

<h2> <b>First: right-click on Avro icon 
then go to tools > Avro Phonetic Options > Edit/Import AutoCorrect Entries.<br>
  Also, check the 'Dictionary mode is the default in suggestion' field and don't forget to 'Enable Auto Correct', as shown below.</b></h2>

![img 1](https://github.com/Botbang/avro-bangla-autocorrect-dictionary/blob/main/shot%201.png)
***
<h2> 
  <I>Then,</I><br>
  <b>click on Import and select the autodict.dct file</b> </h2>

![img 2](https://github.com/Botbang/avro-bangla-autocorrect-dictionary/blob/main/shot%202.png)

<h3>and you should be good to go.</h3>

***

<h1>Enjoy!</h1>

© 2024 - <a href="https://www.facebook.com/afnan.hossain.0">BOTBANG</a>
