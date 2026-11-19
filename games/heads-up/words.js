// Word lists: WORDS[category][difficulty] = [...]
const WORDS = {
  "Animals": {
    Easy: ["Dog", "Cat", "Elephant", "Lion", "Monkey", "Penguin", "Giraffe", "Cow", "Duck", "Tiger", "Horse", "Pig"],
    Medium: ["Kangaroo", "Dolphin", "Octopus", "Flamingo", "Hedgehog", "Crocodile", "Peacock", "Gorilla", "Squirrel", "Camel", "Owl", "Seahorse"],
    Hard: ["Platypus", "Armadillo", "Chameleon", "Narwhal", "Axolotl", "Pangolin", "Mantis Shrimp", "Sloth", "Wolverine", "Komodo Dragon", "Aardvark", "Tardigrade"]
  },
  "Food & Drink": {
    Easy: ["Pizza", "Banana", "Ice Cream", "Hamburger", "Popcorn", "Cookie", "Pancakes", "Spaghetti", "Apple", "Cheese", "Hot Dog", "Chocolate"],
    Medium: ["Sushi", "Guacamole", "Lasagna", "Croissant", "Burrito", "Smoothie", "Dumplings", "Pretzel", "Waffles", "Nachos", "Meatballs", "Cupcake"],
    Hard: ["Ratatouille", "Baklava", "Fondue", "Kimchi", "Tiramisu", "Gazpacho", "Charcuterie", "Eggs Benedict", "Pad Thai", "Paella", "Churros", "Mole Sauce"]
  },
  "Movies & TV": {
    Easy: ["Frozen", "Shrek", "Harry Potter", "Finding Nemo", "Toy Story", "The Lion King", "Spider-Man", "Batman", "Star Wars", "Cinderella", "Minions", "Moana"],
    Medium: ["Titanic", "Jurassic Park", "The Matrix", "Friends", "Jaws", "Ghostbusters", "Back to the Future", "Forrest Gump", "The Office", "Stranger Things", "Home Alone", "Top Gun"],
    Hard: ["Inception", "Pulp Fiction", "The Godfather", "Breaking Bad", "Game of Thrones", "Parasite", "Casablanca", "Blade Runner", "Schitt's Creek", "The Shining", "Gladiator", "Black Mirror"]
  },
  "Places": {
    Easy: ["Beach", "School", "Zoo", "Airport", "Hospital", "Park", "Library", "Farm", "Castle", "Supermarket", "Playground", "Restaurant"],
    Medium: ["Eiffel Tower", "Grand Canyon", "Statue of Liberty", "Great Wall of China", "Hollywood", "Niagara Falls", "Disneyland", "Big Ben", "Mount Everest", "Pyramids", "Times Square", "Venice"],
    Hard: ["Machu Picchu", "Antarctica", "Taj Mahal", "Sahara Desert", "Stonehenge", "Bermuda Triangle", "Angkor Wat", "Galápagos Islands", "Mount Rushmore", "Petra", "Santorini", "Area 51"]
  },
  "Jobs": {
    Easy: ["Teacher", "Doctor", "Firefighter", "Chef", "Farmer", "Police Officer", "Pilot", "Dentist", "Mail Carrier", "Singer", "Painter", "Driver"],
    Medium: ["Astronaut", "Plumber", "Lifeguard", "Magician", "Detective", "Veterinarian", "Architect", "Referee", "Barista", "Librarian", "Carpenter", "Photographer"],
    Hard: ["Sommelier", "Taxidermist", "Locksmith", "Paleontologist", "Air Traffic Controller", "Stunt Double", "Auctioneer", "Cartographer", "Blacksmith", "Interpreter", "Coroner", "Puppeteer"]
  },
  "Sports & Hobbies": {
    Easy: ["Soccer", "Swimming", "Basketball", "Running", "Dancing", "Bowling", "Tennis", "Baseball", "Skiing", "Cycling", "Painting", "Fishing"],
    Medium: ["Surfing", "Gymnastics", "Archery", "Karaoke", "Yoga", "Skateboarding", "Rock Climbing", "Knitting", "Golf", "Ice Hockey", "Pottery", "Scuba Diving"],
    Hard: ["Curling", "Fencing", "Parkour", "Origami", "Bouldering", "Cricket", "Falconry", "Lacrosse", "Calligraphy", "Triathlon", "Pickleball", "Beekeeping"]
  }
};

const DIFFICULTIES = ["Easy", "Medium", "Hard", "Mixed"];
