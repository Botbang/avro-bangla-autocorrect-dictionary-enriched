

# Diccionario de Autocorrección para Avro Bangla

Un diccionario de autocorrección enriquecido para [Avro Keyboard](https://www.omicronlab.com/avro-keyboard.html), seleccionado para hacer la escritura diaria en bangla más rápida y confiable.

[![Dictionary entries](https://img.shields.io/badge/unique%20input%20keys-5%2C495-0b6bcb)](./autodict.dct)
[![Source book](https://img.shields.io/badge/source-book%20included-e7a72e)](./books/government-standard-bangla-and-practical-bangla-2nd-edition.pdf)
[![Website](https://img.shields.io/badge/GitHub%20Pages-visit-167d71)](https://afnan-hossain.github.io/avro-bangla-autocorrect-dictionary-enriched/)

## Acerca del proyecto

El diccionario de autocorrección incluido con Avro Keyboard es útil, pero limitado dada la amplitud y complejidad de la ortografía del bangla. Este proyecto lo amplía con palabras de uso común, ortografías frecuentemente confundidas y entradas seleccionadas de inglés a bangla.

El diccionario actual contiene **5,495 claves de entrada únicas**. Se distribuye en el formato importable `autodict.dct` de Avro.

> Esta obra es un homenaje al creador y a los desarrolladores de Avro Keyboard.

## Base del libro de referencia

El trabajo de enriquecimiento sistemático de este proyecto sigue el volumen de referencia gubernamental de segunda edición que contiene:

- **সরকারি কাজে প্রমিত বাংলা ব্যবহারের নিয়ম**
- **সরকারি কাজে ব্যবহারিক বাংলা**

El volumen fue publicado por la **Célula de Implementación del Idioma Bangla, División de Reforma e Investigación, Ministerio de Administración Pública, Secretaría de Bangladesh, Dacca**. Se incluye una copia del volumen fuente exacto utilizado por este proyecto por motivos de transparencia y reproducibilidad.

[Leer o descargar el libro fuente (PDF)](./books/government-standard-bangla-and-practical-bangla-2nd-edition.pdf)

El libro utiliza una fuente ANSI heredada para bangla. Por lo tanto, su texto requiere reconocimiento óptico de caracteres (OCR) visual y verificación; el texto incrustado en el PDF no se considera una referencia autorizada.

## Descargas

| Archivo | Propósito |
| --- | --- |
| [`autodict.dct`](./autodict.dct?raw=1) | Diccionario de autocorrección de Avro importable |
| [Referencia gubernamental de bangla, 2ª edición](./books/government-standard-bangla-and-practical-bangla-2nd-edition.pdf?raw=1) | Libro fuente utilizado para el enriquecimiento sistemático |

## Instalación en Avro Keyboard

1. Haz clic derecho en el icono de Avro.
2. Abre **Tools → Avro Phonetic Options → Edit/Import Auto Correct Entries**.
3. Activa **Dictionary mode is default in suggestion** y **Enable Auto Correct**.
4. Selecciona **Import**, elige `autodict.dct` y confirma.

![Open Avro's autocorrect settings](./shot%201.png)

![Import the dictionary file](./shot%202.png)

> Avro advierte contra la edición manual de este formato. Importa el archivo a través de la interfaz de Avro a menos que comprendas su representación fonética interna.

## Historial de actualizaciones

| Fecha | Palabras agregadas |
| --- | ---: |
| 2023-12-06 | 209 |
| 2022-05-10 | 250 |
| 2021-05-04 | 1,469 |
| 2021-05-02 | 1,000 |

El enriquecimiento basado en el libro fuente es la próxima gran expansión y está siendo procesado con OCR junto con validación de calidad manual.

## Enlaces del proyecto

- [Sitio web del proyecto](https://afnan-hossain.github.io/avro-bangla-autocorrect-dictionary-enriched/)
- [Informar un problema](https://github.com/afnan-hossain/avro-bangla-autocorrect-dictionary-enriched/issues)
- [BOTBANG en Facebook](https://www.facebook.com/afnan.hossain.0)

© 2026 Afnan Hossain / BOTBANG. Avro Keyboard y la publicación fuente pertenecen a sus respectivos propietarios y editores.
