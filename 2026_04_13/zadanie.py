from typing import List

def read_graph(filename: str) -> tuple[List[List[int]], int]:
    """
    funkcja przyjmuje nazwę pliku i zwraca listy sąsiedztwa oraz ilość wierzchołków
    """
    adj_list: List[List[int]] = []
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            line = file.readline().strip()
            if not line:
                return [], 0
            
            num_vertices = int(line)
            
            for _ in range(num_vertices):
                line = file.readline().strip()
                if line:
                    parts = list(map(int, line.split()))
                    if len(parts) > 1:
                        adj_list.append(parts[1:])
                    else:
                        adj_list.append([])
    except FileNotFoundError:
        print(f"Błąd: Plik {filename} nie został znaleziony.")
        return [], 0
    
    return adj_list, num_vertices

def write_neighbours_list(adj_list: List[List[int]]) -> None:
    """funkcja przyjmuję listę sąsiedztwa i wypisuje ją na ekran w formacie "Sąsiadami wierzchołka X są: a, b, c"""
    print("Lista Sąsiedztwa")
    for i, neighbors in enumerate(adj_list):
        neighbors_str = ", ".join(map(str, neighbors))
        print(f"Sąsiadami wierzchołka {i} są: {neighbors_str}")

def list_to_matrix(adj_list: List[List[int]], num_vertices: int) -> List[List[int]]:
    """funkcja przyjmuje listę sąsiedztwa i zwraca macierz sąsiedztwa"""
    matrix = [[0 for _ in range(num_vertices)] for _ in range(num_vertices)]
    
    for vertex, neighbors in enumerate(adj_list):
        for neighbor in neighbors:
            if neighbor < num_vertices:
                matrix[vertex][neighbor] = 1
                
    return matrix

def write_matrix(matrix: List[List[int]]) -> None:
    """funkcja przyjmue macierz sąsiedztwa i wypisuje ją na ekran"""
    print("\nMacierz Sąsiedztwa")
    for row in matrix:
        print(" ".join(map(str, row)))

def main() -> None:
    filename = "graph.txt"
    
    adj_list, num_v = read_graph(filename)
    
    if not adj_list and num_v == 0:
        return

    write_neighbours_list(adj_list)
    matrix = list_to_matrix(adj_list, num_v)
    write_matrix(matrix)

if __name__ == "__main__":
    main()