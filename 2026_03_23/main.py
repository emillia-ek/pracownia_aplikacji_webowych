from models.Student import Student
from models.Course import Course
def main():
    students: list[Student] = []
    courses: list[Course] = []

    with open("students.txt", "r") as file:
        for line in file:
            parts = line.strip().split(',')
            students.append(Student(int(parts[0]), parts[1], parts[2], int(parts[3])))
    with open("courses.txt", "r") as file:
        for line in file:
            parts = line.strip().split(',')
            courses.append(Course(int(parts[0]), parts[1]))
    for s in students:

        s_courses = [c for c in courses if s.id == c.id_s]
        course_names = [c.name for c in s_courses]
        print(f"{s.first_name} {s.last_name}, ({s.age} lat): {", ".join(map(str, course_names))}")
        print()
        formatted_courses = [f"- {name}" for name in course_names]

        with open(f"{s.first_name.lower()}_{s.last_name.lower()}.txt", "w") as file:
            file.write("Kursy: \n" +",\n".join(map(str, formatted_courses)))

if __name__ == '__main__':
    main()