import shinkansenImg from '../assets/trains/shinkansen.jpeg'
import bigboyImg from '../assets/trains/bigboy.jpeg'
import acelaImg from '../assets/trains/acela.jpeg'
import tgvImg from '../assets/trains/tgv.jpeg'
import scotsmanImg from '../assets/trains/scotsman.jpeg'
import eurostarImg from '../assets/trains/eurostar.jpeg'
import vandebharatImg from '../assets/trains/vandebharat.jpeg'
import darjeelingImg from '../assets/trains/darjeeling.jpeg'
import iceImg from '../assets/trains/ice.jpeg'
import wuppertalImg from '../assets/trains/wuppertal.jpeg'
import glacierImg from '../assets/trains/glacier.jpeg'
import berninaImg from '../assets/trains/bernina.jpeg'
import ghanImg from '../assets/trains/ghan.jpeg'
import puffingImg from '../assets/trains/puffing.jpeg'
import canadianImg from '../assets/trains/canadian.jpeg'
import madarakaImg from '../assets/trains/madaraka.jpeg'
import shanghaimaglevImg from '../assets/trains/shanghaimaglev.jpeg'
import easternexpressImg from '../assets/trains/easternexpress.jpeg'
import transsiberianImg from '../assets/trains/transsiberian.jpeg'
import tulpartalgoImg from '../assets/trains/tulpartalgo.jpeg'

export const trainsData = [
  {
    id: "JP",
    countryName: "Japan",
    capital: "Tokyo",
    flagEmoji: "🇯🇵",
    trains: [
      {
        name: "Shinkansen E5 (Bullet Train)",
        type: "🚀 Super Fast Bullet Train",
        photoUrl: shinkansenImg,
        funFacts: [
          "The Shinkansen looks like a duck-billed bird and flies on the tracks! 🚄",
          "It travels as fast as a real airplane flies on the ground!",
          "It has special tilting wheels so it can zoom around curves without slowing down!"
        ]
      }
    ]
  },
  {
    id: "CN",
    countryName: "China",
    capital: "Beijing",
    flagEmoji: "🇨🇳",
    trains: [
      {
        name: "Shanghai Maglev Train",
        type: "🧲 Magnetic Floating Train",
        photoUrl: shanghaimaglevImg,
        funFacts: [
          "The Shanghai Maglev is the fastest commercial electric train in the whole world! 🧲",
          "It doesn't have wheels! It floats in the air on super-strong magnets, sliding like a hovercraft!",
          "It travels from the airport to the city center in just 7 minutes!"
        ]
      }
    ]
  },
  {
    id: "US",
    countryName: "United States",
    capital: "Washington D.C.",
    flagEmoji: "🇺🇸",
    trains: [
      {
        name: "Union Pacific 'Big Boy'",
        type: "🚂 Giant Steam Locomotive",
        photoUrl: bigboyImg,
        funFacts: [
          "The Big Boy is the biggest and heaviest steam train ever built in history! 🚂",
          "It is so long that it needs two sets of giant driving wheels just to turn corners!",
          "It drinks a giant swimming pool of water to create its white puffy steam cloud."
        ]
      },
      {
        name: "Amtrak Acela",
        type: "⚡ High-Speed Electric Train",
        photoUrl: acelaImg,
        funFacts: [
          "The Acela is the fastest passenger train in America, zooming along the East Coast!",
          "It leans into corners just like a fast motorcycle rider on a racetrack! 🚴",
          "It gets all its power from hanging electric wires over the tracks."
        ]
      }
    ]
  },
  {
    id: "FR",
    countryName: "France",
    capital: "Paris",
    flagEmoji: "🇫🇷",
    trains: [
      {
        name: "TGV Duplex",
        type: "🚀 Double-Decker Speed Train",
        photoUrl: tgvImg,
        funFacts: [
          "The TGV Duplex is an incredibly fast bullet train that is two stories tall! 🪜",
          "You can sit on the top roof deck and look down at cows, farms, and fields zooming by!",
          "It connects big beautiful cities at a speed faster than a race car."
        ]
      }
    ]
  },
  {
    id: "GB",
    countryName: "United Kingdom",
    capital: "London",
    flagEmoji: "🇬🇧",
    trains: [
      {
        name: "The Flying Scotsman",
        type: "🚂 Famous Royal Steam Train",
        photoUrl: scotsmanImg,
        funFacts: [
          "The Flying Scotsman is one of the most famous steam locomotives in the world! 🌟",
          "It was the first steam engine in the world to go 100 miles per hour!",
          "It has a beautiful glossy green paint coat and has traveled all around the world."
        ]
      },
      {
        name: "Eurostar e320",
        type: "🌊 Underwater Bullet Train",
        photoUrl: eurostarImg,
        funFacts: [
          "The Eurostar is a long bullet train that dives deep under the sea inside a giant tunnel! 🌊",
          "It lets you travel from London to Paris while swimming fish and whales swim far above you!",
          "It has two nose cones, one at each end, so it never has to turn around."
        ]
      }
    ]
  },
  {
    id: "IN",
    countryName: "India",
    capital: "New Delhi",
    flagEmoji: "🇮🇳",
    trains: [
      {
        name: "Vande Bharat Express",
        type: "🚀 Modern Express Train",
        photoUrl: vandebharatImg,
        funFacts: [
          "Vande Bharat is a sleek white and orange train that is completely made in India!",
          "It has massive panoramic windows so children can look out for wild peacocks and monkeys! 🦚🐒",
          "The passenger seats can rotate a full circle to always face the direction the train is moving!"
        ]
      },
      {
        name: "Darjeeling Himalayan Toy Train",
        type: "☁️ Cute Mountain Steam Train",
        photoUrl: darjeelingImg,
        funFacts: [
          "This tiny, cute blue steam engine is called a 'Toy Train' because it is so small! 🧸",
          "It climbs very high up into the mountain clouds where tea leaves grow.",
          "It moves slow enough that you can easily walk right next to it as it puffs along!"
        ]
      }
    ]
  },
  {
    id: "DE",
    countryName: "Germany",
    capital: "Berlin",
    flagEmoji: "🇩🇪",
    trains: [
      {
        name: "ICE 4 (Intercity Express)",
        type: "🚀 Sleek European Speedliner",
        photoUrl: iceImg,
        funFacts: [
          "The ICE is a shiny white train with a bright red stripe racing across Europe!",
          "It has a special kitchen car where chefs cook pretzels, soup, and sausages while driving! 🥨",
          "It is designed to be extremely quiet inside, so passengers can take peaceful naps."
        ]
      },
      {
        name: "Wuppertal Schwebebahn",
        type: "🐒 Hanging Upside-Down Train",
        photoUrl: wuppertalImg,
        funFacts: [
          "This train is totally upside down—it hangs *underneath* the tracks and flies through the air! 🐒",
          "It glides right over a real flowing river and through streets like a spaceship!",
          "Once, a famous baby elephant named Tuffi took a ride on it!"
        ]
      }
    ]
  },
  {
    id: "CH",
    countryName: "Switzerland",
    capital: "Bern",
    flagEmoji: "🇨🇭",
    trains: [
      {
        name: "Glacier Express",
        type: "🏔️ Panoramic Alpine Train",
        photoUrl: glacierImg,
        funFacts: [
          "The Glacier Express is a bright red train that drives over high stone bridges in the Swiss Alps!",
          "It has a massive glass curved roof so you can look straight up at snowy mountaintops! 🏔️",
          "It is known as the slowest express train in the world because it wants you to enjoy the views."
        ]
      },
      {
        name: "Bernina Express",
        type: "🎢 Roller Coaster Mountain Train",
        photoUrl: berninaImg,
        funFacts: [
          "This red train climbs super steep snowy mountains without using any cogs or gears!",
          "It drives over a magical circular stone bridge that loops around like a giant roller coaster track! 🎢",
          "It takes you past giant freezing glaciers and down into sunny valleys with palm trees."
        ]
      }
    ]
  },
  {
    id: "TR",
    countryName: "Turkey",
    capital: "Ankara",
    flagEmoji: "🇹🇷",
    trains: [
      {
        name: "Eastern Express (Doğu Ekspresi)",
        type: "🏔️ Snowy Mountain Scenic Train",
        photoUrl: easternexpressImg,
        funFacts: [
          "This cozy passenger train takes you on a magical journey across giant snow-covered mountains! 🏔️",
          "It has sleeper rooms where you can sleep in warm beds while watching the stars outside!",
          "It runs all the way across Turkey, passing beautiful old stone castles and pine forests."
        ]
      }
    ]
  },
  {
    id: "RU",
    countryName: "Russia",
    capital: "Moscow",
    flagEmoji: "🇷🇺",
    trains: [
      {
        name: "Trans-Siberian Express",
        type: "🌍 The Longest Train Ride on Earth!",
        photoUrl: transsiberianImg,
        funFacts: [
          "This is the longest train trip in the world! It takes a whole week of sleeping on the train to finish! 🌍",
          "It races past massive Siberian pine forests, next to deep blue lakes, and past wild brown bears! 🐻",
          "You cross 8 different time zones, meaning you have to change your watch 8 times on the trip!"
        ]
      }
    ]
  },
  {
    id: "KZ",
    countryName: "Kazakhstan",
    capital: "Astana",
    flagEmoji: "🇰🇿",
    trains: [
      {
        name: "Tulpar-Talgo Express",
        type: "🚀 Sleek Desert Steppe Speedliner",
        photoUrl: tulpartalgoImg,
        funFacts: [
          "This super-sleek silver bullet train is built to glide across the giant grass fields (steppes) of Kazakhstan! 🌾",
          "It has special insulated walls to keep children warm and cozy, even when it's freezing cold outside!",
          "The passenger train cars are extra wide and comfortable, making it feel like a rolling hotel!"
        ]
      }
    ]
  },
  {
    id: "AU",
    countryName: "Australia",
    capital: "Canberra",
    flagEmoji: "🇦🇺",
    trains: [
      {
        name: "The Ghan",
        type: "🐫 Legendary Outback Explorer",
        photoUrl: ghanImg,
        funFacts: [
          "The Ghan is a massive train with a red locomotive that is as long as 10 football fields! 🦘",
          "It travels completely across the hot, sandy red desert center of Australia from bottom to top!",
          "It is named after camel drivers who used to explore the desert a long time ago."
        ]
      },
      {
        name: "Puffing Billy",
        type: "🪵 Forest Dangle-Leg Train",
        photoUrl: puffingImg,
        funFacts: [
          "Puffing Billy is a beautiful old steam train that runs through giant green fern tree forests!",
          "Children are officially allowed to sit right on the wooden windowsills and dangle their legs outside! 🪵",
          "It rings a big loud bell and blows a loud steam whistle as it crosses wooden trestle bridges."
        ]
      }
    ]
  },
  {
    id: "CA",
    countryName: "Canada",
    capital: "Ottawa",
    flagEmoji: "🇨🇦",
    trains: [
      {
        name: "VIA Rail 'The Canadian'",
        type: "𫫮 Trans-Continental Dome Train",
        photoUrl: canadianImg,
        funFacts: [
          "The Canadian is a beautiful classic silver train that takes 4 whole days to cross Canada!",
          "It has a special bullet-shaped glass dome room on top for animal watching! 𫫮🐻",
          "You can sleep in bunk beds on the train and eat breakfast while watching giant waterfalls and rocky mountains."
        ]
      }
    ]
  },
  {
    id: "KE",
    countryName: "Kenya",
    capital: "Nairobi",
    flagEmoji: "🇰🇪",
    trains: [
      {
        name: "Madaraka Express",
        type: "🦁 Safari Wildlife Express",
        photoUrl: madarakaImg,
        funFacts: [
          "This beautiful orange and white train travels from the sandy ocean beach straight into safari parks!",
          "The tracks are built on high columns above the ground so wild animals can walk safely underneath! 🐘🦒",
          "If you look out the window, you can see real wild lions, giraffes, and zebras running by!"
        ]
      }
    ]
  }
];
