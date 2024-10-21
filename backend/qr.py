import qrcode

# List of locations with their unique IDs
locations = [
    {
        "id": "f38b0920",
        "name": "Bascom Hill",
        "history": "Bascom Hill is the iconic main quadrangle that forms the historic core of the University of Wisconsin–Madison campus. It is located on the opposite end of State Street from the Wisconsin State Capitol, and is named after John Bascom, former president of the University of Wisconsin. The hill is crowned by Bascom Hall, the main administration building for the campus. Near the main entrance to Bascom Hall sits a statue of President Abraham Lincoln. The first university building, North Hall, was constructed on Bascom Hill in 1851 and is still in use by the Department of Political Science. The second building, South Hall, was built in 1855 and is now used by the administration of the University of Wisconsin College of Letters and Science. In 1974 the area was listed on the National Register of Historic Places as the Bascom Hill Historic District. In addition to the main quadrangle, the district includes historic buildings ranging from the Red Gym to the Wisconsin Historical Society building to the Carillon Tower. The NRHP nomination considers the district 'the most historic cluster of institutional buildings in Wisconsin.'",
    },
    {
        "id": "ad4539f5",
        "name": "Wisconsin State Capitol",
        "history": "The Wisconsin State Capitol, located in Madison, Wisconsin, houses both chambers of the Wisconsin Legislature along with the Wisconsin Supreme Court and the Office of the Governor. Completed in 1917, the building is the fifth to serve as the Wisconsin capitol since the first territorial legislature convened in 1836 and the third building since Wisconsin was granted statehood in 1848. The Wisconsin State Capitol is the tallest building in Madison, a distinction that has been preserved by legislation that prohibits buildings taller than the 187 feet (57 m) columns surrounding the dome. The Capitol is located at the southwestern end of the Madison Isthmus in downtown Madison, bordered by streets that make up the Capitol Square.",
    },
    {
        "id": "25ca6126",
        "name": "Memorial Union",
        "history": "The exterior of the main wing was designed by University Architect Arthur Peabody. Opened on October 5, 1928, the facility is operated by the Wisconsin Union, a membership organization. Porter Butts, the first director, called it a 'college union' because it combines the characteristics of a student union ('student activity center' in other countries) and a student government ('students' union' in other countries) in an organization that brings together students, faculty, and members of the surrounding community.",
    }
]

# Loop through each location and generate a QR code for it
for location in locations:
    # The URL that will be encoded in the QR code (this could be your frontend URL)
    qr_code_url = f"http://localhost:3000/location/{location['id']}"
    
    # Generate the QR code
    img = qrcode.make(qr_code_url)
    
    # Save the QR code as an image file
    img.save(f"qr_codes/{location['id']}.png")

    print(f"Generated QR code for {location['name']} with ID {location['id']}")