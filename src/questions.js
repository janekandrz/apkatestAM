const choice = (id, text) => ({ id, text })

const visualChoice = (id, text, code, preview) => ({
  id,
  text,
  images: [
    { src: code, alt: `Kod wariantu ${id.toUpperCase()}` },
    { src: preview, alt: `Podgląd wariantu ${id.toUpperCase()}` },
  ],
})

export const QUESTIONS = [
  {
    id: 1,
    prompt: 'Zaznacz prawidłowe stwierdzenia dotyczące podanego kodu:',
    media: ['/questions/q01-code.png'],
    choices: [
      choice('a', 'W linii z komentarzem //5 zostanie wyświetlony napis "Obiekt".'),
      choice('b', 'W linii z komentarzem //4 zostanie wyświetlony napis "1".'),
      choice('c', 'W linii z komentarzem //2 zostanie wyświetlony napis "one".'),
      choice('d', 'W linii z komentarzem //1 zostanie wyświetlony napis "String".'),
    ],
    correct: ['a', 'b'],
  },
  {
    id: 2,
    prompt: 'Dla przedstawionego kodu zaznacz prawidłowe odpowiedzi.',
    media: ['/questions/q02-code.png'],
    choices: [
      choice('a', '.sp jest niezależna od wielkości czcionki preferowanej przez użytkownika w systemie.'),
      choice('b', '.sp to rozszerzenie dla typu Integer.'),
      choice('c', '100.sp definiuje jednostkę "scalable pixel".'),
      choice('d', '.sp i .dp definiują tę samą jednostkę.'),
    ],
    correct: ['b', 'c'],
  },
  {
    id: 3,
    prompt: 'Dla przedstawionego kodu zaznacz prawidłowe odpowiedzi:',
    media: ['/questions/q03-code.png'],
    choices: [
      choice('a', 'Dla linii oznaczonej jako //1 na ekranie pojawi się wynik 3.'),
      choice('b', 'Dla linii oznaczonej jako //3 na ekranie pojawi się wynik 20.'),
      choice('c', 'Dla linii oznaczonej jako //4 zostanie zgłoszony wyjątek, ponieważ dla mapy nie można wykonać iteracji forEach.'),
      choice('d', 'Dla linii oznaczonej jako //2 zostanie zgłoszony wyjątek.'),
    ],
    correct: ['a', 'b'],
  },
  {
    id: 4,
    prompt: "Wybierz prawidłowe dopasowania podglądu layoutu i kodu:",
    visual: true,
    choices: [
      visualChoice(
        'a',
        'Arrangement.Center, oba napisy mają rozmiar 100.sp, drugi jest wyrównany do lewej.',
        '/questions/q04-a-code.png',
        '/questions/q04-a-preview.png',
      ),
      visualChoice(
        'b',
        'Arrangement.Center, oba napisy mają rozmiar 100.sp, drugi jest wyrównany do lewej.',
        '/questions/q04-b-code.png',
        '/questions/q04-b-preview.png',
      ),
      visualChoice(
        'c',
        'Arrangement.Center, drugi napis ma rozmiar 36.sp i jest wyrównany do lewej.',
        '/questions/q04-c-code.png',
        '/questions/q04-c-preview.png',
      ),
      visualChoice(
        'd',
        'Arrangement.SpaceBetween, drugi napis ma rozmiar 36.sp i jest wyrównany do prawej.',
        '/questions/q04-d-code.png',
        '/questions/q04-d-preview.png',
      ),
    ],
    correct: ['c', 'd'],
  },
  {
    id: 5,
    prompt: 'Zaznacz prawidłowe stwierdzenia dotyczące podanego kodu:',
    media: ['/questions/q05-code.png'],
    choices: [
      choice('a', 'W wyniku działania pierwszej pętli otrzymamy: 0, 1, 2, 3.'),
      choice('b', 'W wyniku działania pierwszej pętli otrzymamy: 0, 1, 2, 3, 4.'),
      choice('c', 'W wyniku działania drugiej pętli otrzymamy: -2, -1, 0.'),
      choice('d', 'W wyniku działania drugiej pętli otrzymamy: -3, -2, -1, 0.'),
    ],
    correct: ['b', 'd'],
  },
  {
    id: 6,
    prompt: 'Określ prawidłowe stwierdzenia:',
    choices: [
      choice('a', 'XML-RPC oraz JSON-RPC muszą zawsze być użyte razem ze sobą.'),
      choice('b', 'XML-RPC oraz JSON-RPC to technologie umożliwiające zdalne wywoływanie procedur.'),
      choice('c', 'XML-RPC oraz JSON-RPC nie mogą działać przez sieć internetową.'),
      choice('d', 'XML-RPC oraz JSON-RPC umożliwiają połączenie aplikacji z dwóch różnych systemów, np. Android i Windows.'),
    ],
    correct: ['b', 'd'],
  },
  {
    id: 7,
    prompt: 'Aplikacja napisana dla systemu Android została uruchomiona w emulatorze. Podłączenie do lokalnego komputera jest możliwe przez:',
    choices: [
      choice('a', '10.0.2.2'),
      choice('b', 'localhost'),
      choice('c', '127.0.0.1'),
    ],
    correct: ['a'],
  },
  {
    id: 8,
    prompt: 'Jeśli chcemy, aby elementy były rozlokowane poziomo po lewej i prawej stronie ekranu, należy użyć opcji:',
    choices: [
      choice('a', 'Arrangement.Vertical = Arrangement.End'),
      choice('b', 'Arrangement.Vertical = Arrangement.Center'),
      choice('c', 'Arrangement.Vertical = Arrangement.SpaceBetween'),
      choice('d', 'Arrangement.Vertical = Arrangement.Bottom'),
    ],
    correct: ['c'],
  },
  {
    id: 9,
    prompt: 'Przedstaw prawidłowe stwierdzenia dotyczące biblioteki Jetpack Room:',
    choices: [
      choice('a', 'Biblioteka wspiera odwzorowanie encji na obiekty.'),
      choice('b', 'Biblioteka umożliwia lokalne przechowywanie danych.'),
      choice('c', 'Biblioteka musi działać na serwerze bazodanowym.'),
      choice('d', 'Biblioteka umożliwia dostęp do wbudowanej bazy danych SQLite.'),
    ],
    correct: ['a', 'b', 'd'],
  },
  {
    id: 10,
    prompt: 'Zaznacz prawidłowe stwierdzenia dotyczące podanego kodu:',
    media: ['/questions/q10-code.png'],
    choices: [
      choice('a', 'Przy kompilacji wystąpi błąd związany z inicjalizacją zmiennej wartością null w linii //3.'),
      choice('b', 'Zmienna inferredNonNull będzie miała typ String.'),
      choice('c', 'W linii //8 kompilator wydedukuje typ zmiennej nullableinferredType jako String i będzie można przypisać jej null.'),
      choice('d', 'Funkcja strLength nie dopuszcza przekazania argumentu notNull o wartości null.'),
    ],
    correct: ['a', 'b'],
  },
  {
    id: 11,
    prompt: 'W systemie Android:',
    choices: [
      choice('a', 'Nie istnieje wątek UI thread.'),
      choice('b', 'W wątku UI thread można realizować długie zadania, np. czasochłonne obliczenia.'),
      choice('c', 'Systemowy interfejs użytkownika można modyfikować tylko z wątku UI thread.'),
      choice('d', 'Wątek UI thread odpowiada za pracę interfejsu użytkownika.'),
    ],
    correct: ['c', 'd'],
  },
  {
    id: 12,
    prompt: 'Wykonywanie zapytań do bazy przez bibliotekę Room musi:',
    choices: [
      choice('a', 'Być wykonane w oddzielnym wątku, innym niż główny.'),
      choice('b', 'Nie ma znaczenia, w jakim wątku będzie wykonane.'),
      choice('c', 'Być wykonane w wątku głównym.'),
      choice('d', 'Biblioteka musi sama zdecydować, w jakim wątku wykonać zapytanie.'),
    ],
    correct: ['a'],
  },
  {
    id: 13,
    prompt: 'Wzorzec budowniczego (Builder):',
    choices: [
      choice('a', 'Jest niemożliwy do implementacji w systemie Android.'),
      choice('b', 'Stosuje się do redukcji wieloparametrycznych konstruktorów.'),
      choice('c', 'Nie zaleca się jego stosowania w systemie Android.'),
      choice('d', 'Służy tylko do konstrukcji elementów UI.'),
    ],
    correct: ['b'],
  },
  {
    id: 14,
    prompt: 'Podaj poprawne odpowiedzi odnośnie pliku Manifest:',
    choices: [
      choice('a', 'Udostępnia informacje o aplikacji dla innych aplikacji.'),
      choice('b', 'Umożliwia określenie nazwy aplikacji.'),
      choice('c', 'Umożliwia podanie wykorzystywanych czujników oraz innego sprzętu.'),
      choice('d', 'Umożliwia deklarację zakresu praw wymaganych przez aplikację.'),
    ],
    correct: ['a', 'b', 'c', 'd'],
  },
  {
    id: 15,
    prompt: 'Zaznacz prawidłowe stwierdzenia dotyczące podanego kodu:',
    media: ['/questions/q15-code.png'],
    choices: [
      choice('a', 'W linii z komentarzem //8 zostanie wyświetlony napis "[Log] Hello".'),
      choice('b', 'W linii //3 nastąpi niejawna konwersja typu z Int na Double dla zwracanej wartości.'),
      choice('c', 'W linii //10 nastąpi niejawna konwersja typu z Double na Int dla argumentów funkcji sum.'),
      choice('d', 'W linii //4 zdefiniowano funkcję uogólnioną dla dowolnych typów numerycznych.'),
    ],
    correct: ['a'],
  },
  {
    id: 16,
    prompt: 'Wzorca Singleton:',
    choices: [
      choice('a', 'Nie zaleca się implementować w systemie Android.'),
      choice('b', 'Nie można zaimplementować w systemie Android.'),
      choice('c', 'Zaleca się do obsługi zdarzeń w UI.'),
      choice('d', 'Stosuje się na przykład do obsługi połączeń z bazą danych.'),
    ],
    correct: ['d'],
  },
  {
    id: 17,
    prompt: 'Zaznacz prawidłowe stwierdzenia dotyczące kolekcji w języku Kotlin:',
    choices: [
      choice('a', 'Aby utworzyć listę z możliwością zmiany jej rozmiaru, należy wywołać modifiableListOf().'),
      choice('b', `Dla kodu:
val colors = listOf("Red", "Green", "Blue")
println(colors[2])
zostanie wyświetlone "Blue".`),
      choice('c', `Dla kodu:
val colors = listOf("Red", "Green", "Blue")
println(colors[3])
zostanie wyświetlone "Blue".`),
      choice('d', 'Aby utworzyć listę z możliwością zmiany jej rozmiaru, należy wywołać mutableListOf().'),
    ],
    correct: ['b', 'd'],
  },
  {
    id: 18,
    prompt: 'Zaznacz prawidłowe stwierdzenia dotyczące podanego kodu:',
    media: ['/questions/q18-code.png'],
    choices: [
      choice('a', `W pętli //2 zostanie wyświetlone:
Yummy, it's a 1 cake!
Yummy, it's a 2 cake!
Yummy, it's a 3 cake!`),
      choice('b', 'Definicja pętli w linii //3 jest nieprawidłowa.'),
      choice('c', `W pętli //4 zostanie wyświetlone:
Yummy, it's a 1 cake!
Yummy, it's a 2 cake!`),
      choice('d', `W pętli //3 zostanie wyświetlone:
Yummy, it's a carrot cake!
Yummy, it's a cheese cake!`),
    ],
    correct: ['a', 'b'],
  },
  {
    id: 19,
    prompt: 'Zaznacz prawidłowe powiązania kodu z wyglądem interfejsu użytkownika:',
    visual: true,
    choices: [
      visualChoice(
        'a',
        'tipPercent / 110 * amount, z ceil przy włączonym zaokrąglaniu; podgląd pokazuje $9.09.',
        '/questions/q19-a-code.png',
        '/questions/q19-a-preview.png',
      ),
      visualChoice(
        'b',
        'tipPercent / 100 * amount, z ceil przy włączonym zaokrąglaniu; podgląd pokazuje $1.10.',
        '/questions/q19-b-code.png',
        '/questions/q19-b-preview.png',
      ),
      visualChoice(
        'c',
        'tipPercent / 100 * amount, z floor przy włączonym zaokrąglaniu; podgląd pokazuje $2.00.',
        '/questions/q19-c-code.png',
        '/questions/q19-c-preview.png',
      ),
      visualChoice(
        'd',
        'tipPercent / 100 * amount, z ceil przy włączonym zaokrąglaniu; podgląd pokazuje $10.00.',
        '/questions/q19-d-code.png',
        '/questions/q19-d-preview.png',
      ),
    ],
    correct: ['a', 'd'],
  },
  {
    id: 20,
    prompt: 'Określ prawdziwe zdania dla klasy CameraX:',
    note: 'W PDF zaznaczono dwie poprawne odpowiedzi i uzyskano 0,67 pkt, co wskazuje na trzecią brakującą poprawną odpowiedź.',
    choices: [
      choice('a', 'Umożliwia podłączenie bibliotek sieci neuronowych.'),
      choice('b', 'Umożliwia analizę obrazu z kamery.'),
      choice('c', 'Umożliwia implementację podglądu we własnej aplikacji.'),
    ],
    correct: ['a', 'b', 'c'],
  },
  {
    id: 21,
    prompt: 'Jaki jest właściwy kod do deklarowania zmiennej nullable w Kotlin?',
    choices: [
      choice('a', 'val text: nullable = null'),
      choice('b', 'val ext: String'),
      choice('c', 'val text: String = null'),
      choice('d', 'val text: String? = null'),
    ],
    correct: ['d'],
  },
  {
    id: 22,
    prompt: 'W systemie Android SensorManager API posiada własności:',
    choices: [
      choice('a', 'Umożliwia podłączenie się do zewnętrznych czujników.'),
      choice('b', 'Niemożliwa jest imitacja nieistniejącego czujnika za pomocą jego wirtualnej wersji.'),
      choice('c', 'Wymaga, aby wszystkie czujniki były takie same.'),
    ],
    correct: ['a'],
  },
  {
    id: 23,
    prompt: 'Zaznacz prawidłowe stwierdzenia dotyczące podanego kodu:',
    media: ['/questions/q23-code.png'],
    choices: [
      choice('a', 'Dla punktu 2 wyświetli się lista: [-2.0, 0.0, 1.0, 1.0, 2.0].'),
      choice('b', 'Dla punktu 1 wyświetli się lista: [1.0, -2.0, 0.0, 2.0, 1.0].'),
      choice('c', 'Dla punktu 4 wyświetli się lista: [-8.0, 0.0, 1.0, 1.0, 8.0].'),
      choice('d', 'Dla punktu 3 wyświetli się lista: [0.0, 1.0, 1.0, 4.0, 4.0].'),
    ],
    correct: ['a', 'b'],
  },
  {
    id: 24,
    prompt: 'Aby połączyć się z emulatora Androida do lokalnego komputera, domyślnie należy podać IP:',
    choices: [
      choice('a', '127.0.0.1'),
      choice('b', '10.0.2.2'),
      choice('c', 'Dowolne.'),
      choice('d', 'Nie wolno się połączyć.'),
    ],
    correct: ['b'],
  },
  {
    id: 25,
    prompt: 'Dla przedstawionej struktury folderów zaznacz prawidłowe odpowiedzi:',
    media: ['/questions/q25-structure.png'],
    choices: [
      choice('a', 'W klasie R można się spodziewać identyfikatora R.drawable.graphic.png.'),
      choice('b', 'W klasie R można się spodziewać identyfikatora R.drawable.graphic.'),
      choice('c', 'Katalog res/ zawiera zasoby w podkatalogach, w tym drawable/ dla zasobów graficznych.'),
      choice('d', 'W klasie R można się spodziewać identyfikatora R.drawable.androidparty.'),
    ],
    correct: ['b', 'c'],
  },
  {
    id: 26,
    prompt: 'System Android umożliwia:',
    choices: [
      choice('a', 'Połączenie z zewnętrznym systemem tylko przez REST API.'),
      choice('b', 'Połączenie przez REST API tylko po dołączeniu zewnętrznych bibliotek.'),
      choice('c', 'Połączenie z zewnętrznym systemem, ale nie przez REST API.'),
      choice('d', 'Połączenie z zewnętrznym systemem przez REST API.'),
    ],
    correct: ['d'],
  },
  {
    id: 27,
    prompt: 'Klasa HttpURLConnection umożliwia:',
    choices: [
      choice('a', 'Wykonanie operacji POST na serwerze WWW.'),
      choice('b', 'Ze względu na protokół HTTPS klasa jest nieużywana.'),
      choice('c', 'Wykonanie operacji GET na serwerze WWW.'),
    ],
    correct: ['a', 'c'],
  },
  {
    id: 28,
    prompt: 'Zapytanie SELECT * FROM produkt:',
    choices: [
      choice('a', 'Pobiera wszystkie dane z tabeli produkt posortowane alfabetycznie.'),
      choice('b', 'Pobiera wszystkie dane z tabeli produkt.'),
      choice('c', 'Pobiera wszystkie dane z tabeli produkt, nawet te ostatnio usunięte.'),
      choice('d', 'Pobiera wszystkie dane z tabeli produkt, które nie są używane przez inne aplikacje.'),
    ],
    correct: ['b'],
  },
  {
    id: 29,
    prompt: 'Dla przedstawionego kodu określ prawdziwe stwierdzenia:',
    media: ['/questions/q29-code.png'],
    choices: [
      choice('a', 'Kod { "OK" } to funkcja przekazana jako parametr text.'),
      choice('b', 'Parametr text w funkcji multiplePrinter to tzw. Higher Order Function.'),
      choice('c', `Wyświetlony tekst to:
1 = OK
2 = OK
3 = OK
4 = OK`),
      choice('d', 'multiplePrinter(4) { "OK" } zgłosi błąd.'),
    ],
    correct: ['a', 'c'],
  },
  {
    id: 30,
    prompt: 'Co robi fragment kodu: foo()()?',
    choices: [
      choice('a', 'Tworzy dwuwymiarową tablicę.'),
      choice('b', 'Kompilacja kończy się niepowodzeniem.'),
      choice('c', 'Wywołuje funkcję foo() w sposób asynchroniczny.'),
      choice('d', 'Wywołuje funkcję, która jest zwracana przez wywołanie foo().'),
    ],
    correct: ['d'],
  },
].map((question) => ({
  ...question,
  source: 'AM_Bernat',
}))
