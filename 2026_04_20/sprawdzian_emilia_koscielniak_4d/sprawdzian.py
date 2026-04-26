import datetime
import json

from models.Teacher import Teacher
from models.Student import Student
from models.Subject import Subject
from models.Grades import Grades
from year_grade import year_grade

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Emilia Kościelniak 4D"

def main():
    teachers: list[Teacher] = []
    subjects: list[Subject] = []
    students: list[Students] = []
    grades_list: list[Grades] = []

    with open("teachers.txt", "r") as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) >= 3:
                teachers.append(Teacher(int(parts[0]), parts[1], parts[2]))
    with open("subjects.txt", "r") as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) >= 3:
                s_id = int(parts[0])
                s_name = parts[1]
                t_id = int(parts[2])
                teacher = next((t for t in teachers if t._id == t_id), None)
                if teacher:
                    subjects.append(Subject(s_id, s_name, teacher))
    with open("students.txt", "r") as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) >= 4:
                s_id = int(parts[0])
                s_name = parts[1]
                s_surname = parts[2]
                s_birthdate = datetime.datetime.strptime(parts[3], '%Y-%m-%d').date()
                students.append(Student(int(s_id), s_name, s_surname, s_birthdate))

    with open("grades.txt", "r") as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) >= 3:
                u_id = int(parts[0])
                s_id = int(parts[1])
                grades = parts[2]
                student = next((s for s in students if s._id == u_id), None)
                subject = next((s for s in subjects if s._id == s_id), None)

                g_obj = Grades(student, subject)
                for val in grades.split(','):
                    g_obj.add_grade(int(val))
                grades_list.append(g_obj)

    json_students_data = []
    print("Oceny i poszczególne średnie uczniów.")
    for s in students:
        print(str(s)+":")
        student_key = str(s)
        student_dict = {student_key: {}}

        #oceny poszczeolnego ucznia
        s_grades = [g for g in grades_list if g.student._id == s._id]

        for g in s_grades:
            subject = g.subject.name
            grades = g.get_grades()
            print(" "+subject)
            print("     Oceny: " + ", ".join(map(str, grades)))
            print("     Średnia: " + str(round(g.get_average(),2)))
            print("     Ocena końcowa: " + str(year_grade(round(g.get_average(),2))))

            student_dict[student_key][g.subject.name] = {
                "Oceny": ", ".join(map(str, grades)),
                "Srednia": str(round(g.get_average(),2)),
                "Ocena roczna": str(year_grade(round(g.get_average(),2)))
            }
        print("")
        json_students_data.append(student_dict)

    with open('students.json', 'w', encoding='utf-8') as jf:
        json.dump(json_students_data, jf, indent=4, ensure_ascii=False)
        print("=" * 50)
        print()

    json_subjects_data = []
    for s in subjects:
        print(str(s.name)+":") #przedimot
        #print(str(s.teacher)) --- imie nazwisko nau
        print("    Nauczyciel: "+str(s.teacher))
        all_grades = []
        for g in grades_list:
            if g.subject._id == s._id:
                all_grades.extend(g.get_grades())

        average = round(sum(all_grades) / len(all_grades),2)
        print("    Oceny: " + ", ".join(map(str, all_grades)))
        print("    Średnia: "+str(average))
        print()
        json_subjects_data.append({
            str(s.name):{
                "Nauczyciel":str(s.teacher),
                "Oceny":all_grades,
                "Średnia":average
            }
        })

    with open('subjects.json', 'w', encoding='utf-8') as jf:
        json.dump(json_subjects_data, jf, indent=4, ensure_ascii=False)
        print("=" * 50)
        print()

if __name__ == "__main__":
    main()