from ast import Add
from math import floor
from random import randint
from dummy.models import Person, Work, Address

LETTERS = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
]

def upper_limit(length):
    limit = 0
    for l in range(1, length + 1):
        limit = limit + pow(26, l)
    return limit

def get_name(n):
    '''
    This is the equation used for spreadsheet columns

    Examples

    1 => A
    26 => Z

    27 => AA
    702 => ZZ
    '''

    letters = []

    length = 1
    while(upper_limit(length) < n):
        length = length + 1

    while(length > 0):
        multiple = pow(26, length - 1)
        m = floor(n / multiple)
        m = m - 1 if length > 1 and n % multiple == 0 else m
        m = min(26, m)
        letters.append(LETTERS[m - 1])
        n = n - (m * multiple)
        length = length - 1

    return "".join(letters)


def run():
    person_addresses = []
    for i in range(1000, 2000):
        person_addresses.append(Address(post_code=f"{i}"))

    person_addresses = Address.objects.bulk_create(person_addresses)

    work_addresses = []
    for i in range(1000, 2000):
        work_addresses.append(Address(post_code=f"{i}"))

    work_addresses = Address.objects.bulk_create(work_addresses)

    works = []
    for work_address in work_addresses:
        works.append(Work(address=work_address))

    works = Work.objects.bulk_create(works)

    persons = []
    for i in range(1000):
        persons.append(
            Person(
                name=f"{get_name(i)}",
                age=randint(18, 100),
                address=person_addresses[i],
                work=works[i]
            )
        )

    Person.objects.bulk_create(persons)