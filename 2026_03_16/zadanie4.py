with open("sygnaly.txt", "r") as plik:
    slowa = plik.read().split()

with open("wyniki4.txt", "w") as wyjscie:
    
    # 4.1
    print("4.1", file=wyjscie)
    co_czterdzieste = slowa[39::40] 
    for s in co_czterdzieste:
        if len(s) >= 10:
            print(s[9], end="", file=wyjscie)
    print(file=wyjscie)

    # 4.2
    print("4.2", file=wyjscie)
    najlepsze_slowo = ""
    max_roznych = 0
    for w in slowa:
        liczba_roznych = len(set(w))
        if liczba_roznych > max_roznych:
            max_roznych = liczba_roznych
            najlepsze_slowo = w

    print(f"Slowo: {najlepsze_slowo}\nIlosc: {max_roznych}", file=wyjscie)

    # 4.3
    print("4.3", file=wyjscie)
    for s in slowa:
        kody = [ord(litera) for litera in s]
        if max(kody) - min(kody) <= 10:
            print(s, file=wyjscie)

print("WYniki w wyniki4.txt")