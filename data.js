// Base Instagram data (will be expanded dynamically)
const baseInstagramData = {
    "profile": {
        "username": "calvarystp",
        "displayName": "CALVARYST.PETE",
        "profilePic": "https://randomuser.me/api/portraits/men/32.jpg"
    },
    "stories": [
        {
            "username": "jonathan_",
            "profilePic": "https://randomuser.me/api/portraits/men/41.jpg"
        },
        {
            "username": "johnnyolth",
            "profilePic": "https://randomuser.me/api/portraits/men/42.jpg"
        },
        {
            "username": "calvaryma",
            "profilePic": "https://randomuser.me/api/portraits/women/43.jpg"
        },
        {
            "username": "theorigina",
            "profilePic": "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            "username": "thejakema",
            "profilePic": "https://randomuser.me/api/portraits/men/45.jpg"
        },
        {
            "username": "calvarycla",
            "profilePic": "https://randomuser.me/api/portraits/women/46.jpg"
        }
    ],
    "posts": [
        {
            "username": "calvarymagazine",
            "profilePic": "https://randomuser.me/api/portraits/women/11.jpg",
            "postImage": "https://picsum.photos/id/1/600/450",
            "likes": {
                "count": 1000,
                "likedBy": "calvarymv and others"
            },
            "caption": "AS IRON SHARPENS IRON ~ SOCAL MEN'S CONFERENCE Eight thousand men attended the free event at the Anaheim Convention...",
            "comments": 7,
            "timePosted": "3 days ago"
        }
    ],
    "suggestions": [
        {
            "username": "cthurmanrea",
            "relation": "Followed by theoriginalavery",
            "profilePic": "https://randomuser.me/api/portraits/women/21.jpg"
        },
        {
            "username": "border_wulf",
            "relation": "Followed by danielleharris95 + 6 more",
            "profilePic": "https://randomuser.me/api/portraits/men/22.jpg"
        },
        {
            "username": "amazinglegendkun",
            "relation": "Suggested for you",
            "profilePic": "https://randomuser.me/api/portraits/women/23.jpg"
        },
        {
            "username": "the_first_turtle",
            "relation": "Followed by callie.marolf + 3 more",
            "profilePic": "https://randomuser.me/api/portraits/men/24.jpg"
        },
        {
            "username": "didagus.fb",
            "relation": "Followed by asian__diaz + 5 more",
            "profilePic": "https://randomuser.me/api/portraits/women/25.jpg"
        }
    ],
    "footer": {
        "links": ["About", "Help", "Press", "API", "Jobs", "Privacy", "Terms", "Locations", "Language"],
        "copyright": "© 2025 INSTAGRAM FROM META"
    }
};

// Usernames list for generating random content
const usernames = [
    "nature_photography", "travel_diaries", "food_lover", "fitness_freak", 
    "art_gallery", "music_feeds", "pet_paradise", "fashion_forward",
    "tech_savvy", "bookworm_diary", "adventure_seeker", "urban_explorer",
    "healthy_living", "creative_corner", "sports_fan", "meditation_guru",
    "coffee_addict", "planet_traveler", "yoga_practice", "design_inspiration"
];

// Captions list for generating random content
const captions = [
    "Enjoying the perfect sunrise this morning! 🌅 #morningvibes #nature",
    "Nothing beats a homemade meal after a long day. 🍽️ #foodie #cooking",
    "Just completed my 10k training! Next stop: marathon 🏃‍♂️ #fitness #goals",
    "Weekend getaway with the best people ❤️ #friends #memories #travel",
    "New art project in progress! Can't wait to share the final result. 🎨 #art #creative",
    "This view was worth the hike! 🏔️ #adventure #outdoors #hiking",
    "My happy place. 📚☕ #reading #coffeetime #peaceful",
    "Concert night was absolutely amazing! 🎵 #music #liveperformance",
    "Working on my mindfulness journey one day at a time. 🧘‍♀️ #meditation #peace",
    "Exploring new streets in the city today. 🏙️ #urban #exploration",
    "Just adopted this cutie! Meet my new family member 🐶 #pets #doggo #adoption",
    "Fashion week inspirations that I'm loving right now ✨ #fashion #style",
    "Tech setup upgrade complete! 💻 #tech #gadgets #workspace",
    "Beach day was exactly what I needed 🏖️ #ocean #relaxation #sunshine",
    "Trying out this new recipe and it's amazing! 🍲 #cooking #foodblogger",
    "Morning workout done! Starting the day right 💪 #fitness #motivation",
    "Road trip adventures continue! 🚗 #travel #roadtrip #exploration",
    "Found this hidden gem today! 💎 #discovery #local #treasures",
    "Studio time is the best time 🎵 #music #creating #passion",
    "Plant family growing strong 🌿 #plants #greenthumb #homedecor"
];

// Relations list for suggestions
const relations = [
    "Followed by username123 + 3 more",
    "Followed by friend_account",
    "Suggested for you",
    "New to Instagram",
    "Followed by another_friend + 5 more"
];