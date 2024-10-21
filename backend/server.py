from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app, resources={r'/api/*': {'origins': 'http://localhost:3000'}})  # Enable CORS for all routes
#, origins=['http://localhost:3000/scanqr']

# app.config['CORS_HEADERS'] = 'Content-Type'


locations = [
    {
        "id": "f38b0920",
        "image": "BascomHallFullPicture",
        "name": "Bascom Hill",
        "address": "1872 Lincoln Dr",
        "yearConstructed": "1851",
        "history": "Bascom Hill is the iconic main quadrangle that forms the historic core of the University of Wisconsin–Madison campus. It is located on the opposite end of State Street from the Wisconsin State Capitol, and is named after John Bascom, former president of the University of Wisconsin. The hill is crowned by Bascom Hall, the main administration building for the campus. Near the main entrance to Bascom Hall sits a statue of President Abraham Lincoln. The first university building, North Hall, was constructed on Bascom Hill in 1851 and is still in use by the Department of Political Science. The second building, South Hall, was built in 1855 and is now used by the administration of the University of Wisconsin College of Letters and Science. In 1974 the area was listed on the National Register of Historic Places as the Bascom Hill Historic District. In addition to the main quadrangle, the district includes historic buildings ranging from the Red Gym to the Wisconsin Historical Society building to the Carillon Tower. The NRHP nomination considers the district 'the most historic cluster of institutional buildings in Wisconsin.'",
    },
    {
        "id": "ad4539f5",
        "image": "CapitolFullPicture",
        "name": "Wisconsin State Capitol",
        "address": "2 E Main St",
        "yearConstructed": "1917",
        "history": "The Wisconsin State Capitol, located in Madison, Wisconsin, houses both chambers of the Wisconsin Legislature along with the Wisconsin Supreme Court and the Office of the Governor. Completed in 1917, the building is the fifth to serve as the Wisconsin capitol since the first territorial legislature convened in 1836 and the third building since Wisconsin was granted statehood in 1848. The Wisconsin State Capitol is the tallest building in Madison, a distinction that has been preserved by legislation that prohibits buildings taller than the 187 feet (57 m) columns surrounding the dome. The Capitol is located at the southwestern end of the Madison Isthmus in downtown Madison, bordered by streets that make up the Capitol Square.",
    },
    {
        "id": "25ca6126",
        "image": "MemorialUnionFullPicture",
        "name": "Memorial Union",
        "address": "800 Langdon St",
        "yearConstructed": "1928",
        "history": "The exterior of the main wing was designed by University Architect Arthur Peabody. Opened on October 5, 1928, the facility is operated by the Wisconsin Union, a membership organization. Porter Butts, the first director, called it a 'college union' because it combines the characteristics of a student union ('student activity center' in other countries) and a student government ('students' union' in other countries) in an organization that brings together students, faculty, and members of the surrounding community.",
    }
]

# API to fetch location data based on the unique ID from the QR code
@app.route('/api/location/<location_id>', methods=['GET'])
def get_location(location_id):
    location = next((loc for loc in locations if loc["id"] == location_id), None)
    if location:
        return jsonify(location)
    else:
        return jsonify({"error": "Location not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)