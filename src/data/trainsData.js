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
import vistadomeImg from '../assets/trains/vistadome.jpeg'
import cloudsImg from '../assets/trains/clouds.jpeg'
import corcovadoImg from '../assets/trains/corcovado.jpeg'
import borneoImg from '../assets/trains/borneo.jpeg'
import transmongolianImg from '../assets/trains/transmongolian.jpeg'
import nepalImg from '../assets/trains/nepal.jpeg'
import aveImg from '../assets/trains/ave.jpeg'
import belgiumImg from '../assets/trains/belgium.jpeg'
import ktxImg from '../assets/trains/ktx.jpeg'
import vereskImg from '../assets/trains/veresk.jpeg'
import friendshipImg from '../assets/trains/friendship.jpeg'
import haramainImg from '../assets/trains/haramain.jpeg'
import omanImg from '../assets/trains/oman.jpeg'
import thailandImg from '../assets/trains/thailand.jpeg'
import laosImg from '../assets/trains/laos.jpeg'
import singaporeImg from '../assets/trains/singapore.jpeg'
import bratislavasplitImg from '../assets/trains/bratislavasplit.jpeg'
import jordanImg from '../assets/trains/jordan.jpeg'

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
          "⚡ Top Speed: Zooms at an amazing 200 mph! ⚡",
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
          "⚡ Top Speed: Floats through the air at a mind-blowing 268 mph! ⚡",
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
          "      Top Speed: Puffs along at a giant 80 mph!      ",
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
          "⚡ Top Speed: Flies along the rails at 150 mph! ⚡",
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
          "⚡ Top Speed: Cruises across France at 200 mph! ⚡",
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
          "      Top Speed: Puffs at a historic 100 mph!      ",
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
          "⚡ Top Speed: Undersea cruise at 200 mph! ⚡",
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
          "⚡ Top Speed: Flies across India at 110 mph! ⚡",
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
          "      Top Speed: Cozy, gentle stroll at only 10 mph!      ",
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
          "⚡ Top Speed: Glides quietly at 165 mph! ⚡",
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
          "🐒 Top Speed: Swings upside down at 37 mph! 🐒",
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
          "      Top Speed: Famously slow alpine cruise at only 24 mph!      ",
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
          "⛰️ Top Speed: Climbs snowy loops at a safe 28 mph! ⛰️",
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
          "🏔️ Top Speed: Cozy winter journey at 50 mph! 🏔️",
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
          "🌍 Top Speed: Day and night desert cruising at 60 mph! 🌍",
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
          "⚡ Top Speed: Glides across fields at 125 mph! ⚡",
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
          "🐫 Top Speed: Rolls across red desert sands at 70 mph! 🐫",
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
          "🌳 Top Speed: Fun forest chugger at 15 mph! 🌳",
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
          "🏔️ Top Speed: Mountain watching at 80 mph! 🏔️",
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
          "🦁 Top Speed: Safari cruising at 75 mph! 🦁",
          "This beautiful orange and white train travels from the sandy ocean beach straight into safari parks!",
          "The tracks are built on high columns above the ground so wild animals can walk safely underneath! 🐘🦒",
          "If you look out the window, you can see real wild lions, giraffes, and zebras running by!"
        ]
      }
    ]
  },
  {
    id: "PE",
    countryName: "Peru",
    capital: "Lima",
    flagEmoji: "🇵🇪",
    trains: [
      {
        name: "PeruRail Vistadome",
        type: "🏔️ Cloud Forest Explorer",
        photoUrl: vistadomeImg,
        funFacts: [
          "⛰️ Top Speed: Careful canyon climbing at 30 mph! ⛰️",
          "This bright blue train climbs super-high up into the clouds to a secret ancient city in the sky called Machu Picchu! ☁️",
          "It has giant curved windows on the ceiling so you can look straight up at flying giant condors (the biggest birds in the sky!) and high snowy mountains! 🦅",
          "Inside the train, musicians play happy music on drums and flutes while performers dance in colorful animal costumes! 🪘"
        ]
      }
    ]
  },
  {
    id: "AR",
    countryName: "Argentina",
    capital: "Buenos Aires",
    flagEmoji: "🇦🇷",
    trains: [
      {
        name: "Tren a las Nubes (Train to the Clouds)",
        type: "🕸️ Sky Bridge Express",
        photoUrl: cloudsImg,
        funFacts: [
          "☁️ Top Speed: Flying into the clouds at 22 mph! ☁️",
          "This train is called the 'Train to the Clouds' because it drives so high that puffy white clouds float right next to your window! ☁️",
          "It rolls over a giant steel bridge that looks like a giant toy spiderweb stretching across a deep red canyon! 🕸️",
          "It goes so high up in the sky that it is closer to space than almost any other train on Earth!"
        ]
      }
    ]
  },
  {
    id: "BR",
    countryName: "Brazil",
    capital: "Brasília",
    flagEmoji: "🇧🇷",
    trains: [
      {
        name: "Trem do Corcovado",
        type: "🎢 Mountain Jungle Cog Train",
        photoUrl: corcovadoImg,
        funFacts: [
          "🎢 Top Speed: Safe mountain climbing at only 9 mph! 🎢",
          "This bright red train climbs steep, green jungle hills like a real-life roller coaster! 🎢",
          "It drives through a thick jungle where wild monkeys and colorful toucans chatter in the trees! 🐒🦜",
          "It takes you all the way to the top of a giant mountain where a massive statue of a man with open arms stands looking over the ocean!"
        ]
      }
    ]
  },
  {
    id: "MY",
    countryName: "Malaysia (Borneo)",
    capital: "Kuala Lumpur",
    flagEmoji: "🇲🇾",
    trains: [
      {
        name: "North Borneo Railway",
        type: "🌳 Jungle Steam Heritage Train",
        photoUrl: borneoImg,
        funFacts: [
          "🌳 Top Speed: Chugs through the jungle at a safe 20 mph! 🌳",
          "This is a beautiful, old-fashioned steam train that burns real wood to create puffy white clouds! 🪵💨",
          "It drives through tropical rainforests where wild monkeys chitter in the trees and crosses wooden trestle bridges! 🐒",
          "Passengers get a special 'steam train passport' that gets stamped at every station, just like a real explorer! 🎫"
        ]
      }
    ]
  },
  {
    id: "MN",
    countryName: "Mongolia",
    capital: "Ulaanbaatar",
    flagEmoji: "🇲🇳",
    trains: [
      {
        name: "Trans-Mongolian Railway",
        type: "🐫 Gobi Desert Express",
        photoUrl: transmongolianImg,
        funFacts: [
          "🐫 Top Speed: Cruises across the wild Gobi desert at 55 mph! 🐫",
          "This long desert train passes herds of wild running horses and furry two-humped Bactrian camels! 🐫🐎",
          "You can look out the window and see white round tents called 'yurts' where nomadic families live on the grassy steppes! ⛺",
          "It chugs along the ancient silk route between massive sandy dunes and rocky canyons!"
        ]
      }
    ]
  },
  {
    id: "NP",
    countryName: "Nepal",
    capital: "Kathmandu",
    flagEmoji: "🇳🇵",
    trains: [
      {
        name: "Nepal Railway",
        type: "🏔️ Himalayan foothill Explorer",
        photoUrl: nepalImg,
        funFacts: [
          "🏔️ Top Speed: Cozy and steady mountain cruise at 35 mph! 🏔️",
          "This is a colorful, happy passenger train that chugs past the foothills of the giant snowy Himalayas—the tallest mountains on Earth! 🏔️",
          "It rolls through beautiful green valleys filled with bright yellow mustard flowers and farming villages! 🌾🌼",
          "Locals wave happily at the train as it chugs along, carrying families to historic temple towns!"
        ]
      }
    ]
  },
  {
    id: "ES",
    countryName: "Spain",
    capital: "Madrid",
    flagEmoji: "🇪🇸",
    trains: [
      {
        name: "Renfe AVE",
        type: "🚀 Duck-Billed European Bullet Train",
        photoUrl: aveImg,
        funFacts: [
          "⚡ Top Speed: Flies across sunny Spain at an amazing 193 mph! ⚡",
          "The AVE has a sleek, pointy nose that looks like a fast duck-billed bird zooming through the air! 🐦",
          "It travels so fast that it connects Madrid to Barcelona in just two and a half hours! 🚀",
          "It has glass-roofed passenger cars and is incredibly quiet, smooth, and fast!"
        ]
      }
    ]
  },
  {
    id: "BE",
    countryName: "Belgium",
    capital: "Brussels",
    flagEmoji: "🇧🇪",
    trains: [
      {
        name: "Belgian Double-Decker Network",
        type: "🏰 Double-Decker Castle Chugger",
        photoUrl: belgiumImg,
        funFacts: [
          "🏔️ Top Speed: Cruises at a smooth 100 mph! 🏔️",
          "Belgium has one of the busiest and most magical train networks on Earth, chugging past ancient stone castles and green fields! 🏰",
          "It is double-decker! You can sit on the top roof level and look down at chocolate factories and historic windmills zooming by! 🍫",
          "It has huge, cozy glass-windowed cars where families can play games while traveling from city to city!"
        ]
      }
    ]
  },
  {
    id: "KR",
    countryName: "South Korea",
    capital: "Seoul",
    flagEmoji: "🇰🇷",
    trains: [
      {
        name: "KTX (Korea Train eXpress)",
        type: "🚀 Space-Rocket Speed Bullet",
        photoUrl: ktxImg,
        funFacts: [
          "⚡ Top Speed: Flies across Korea at a lightning-fast 186 mph! ⚡",
          "The KTX bullet train is shaped like a super-sleek futuristic silver space rocket! 🚀",
          "It zooms through long dark mountain tunnels and over giant bridges crossing high above the ocean! 🌊",
          "It has cinema screens inside the passenger cars where you can watch cartoons while traveling!"
        ]
      }
    ]
  },
  {
    id: "IR",
    countryName: "Iran",
    capital: "Tehran",
    flagEmoji: "🇮🇷",
    trains: [
      {
        name: "Trans-Iranian Railway",
        type: "🏔️ Veresk Stone Arch Explorer",
        photoUrl: vereskImg,
        funFacts: [
          "⛰️ Top Speed: Climbs through giant mountain peaks at 60 mph! ⛰️",
          "This mountain train crosses the famous Veresk Bridge, a giant stone arch bridge hanging high in the clouds! ☁️🌉",
          "It dives through over 100 dark tunnels and loops around spiral tracks like a giant mountain roller coaster! 🎢",
          "It travels from the sandy shores of the sea all the way through hot deserts and snowy pine forests!"
        ]
      }
    ]
  },
  {
    id: "AF",
    countryName: "Afghanistan",
    capital: "Kabul",
    flagEmoji: "🇦🇫",
    trains: [
      {
        name: "Hairatan Railway Link",
        type: "🐫 Sandcastle Desert Steppe Express",
        photoUrl: friendshipImg,
        funFacts: [
          "🐫 Top Speed: Glides across the ancient desert fields at 45 mph! 🐫",
          "This big, strong diesel train crosses the famous Friendship Bridge over a giant wide river! 🌉",
          "It zooms past ancient sandy castles and fortresses that look like giant sandcastles in the desert! 🏰🏜️",
          "It carries cargo and happy travelers past herds of grazing desert sheep under sunny blue skies!"
        ]
      }
    ]
  },
  {
    id: "SA",
    countryName: "Saudi Arabia",
    capital: "Riyadh",
    flagEmoji: "🇸🇦",
    trains: [
      {
        name: "Haramain High-Speed Railway",
        type: "🚀 Space-Rocket Desert Speed Bullet",
        photoUrl: haramainImg,
        funFacts: [
          "⚡ Top Speed: Flies across the desert sands at a super-fast 186 mph! ⚡",
          "This sleek white bullet train looks like a shiny futuristic spaceship racing through the desert dunes! 🚀🏜️",
          "It has special sandstorm shields on the windows to keep passengers safe and cool in the hot sun! ☀️",
          "It connects magical ancient cities while gliding silently on super-smooth electric tracks!"
        ]
      }
    ]
  },
  {
    id: "OM",
    countryName: "Oman",
    capital: "Muscat",
    flagEmoji: "🇴🇲",
    trains: [
      {
        name: "Oman National Rail Link",
        type: "🏰 Wadi Oasis Mountain Speedliner",
        photoUrl: omanImg,
        funFacts: [
          "⛰️ Top Speed: Cruises through mountain valleys at a steady 75 mph! ⛰️",
          "This big, strong silver train climbs through the majestic green Al Hajar mountains and deep rocky canyons! 🏔️🏜️",
          "It dives through deep mountain tunnels and crosses high stone bridges overlooking green oasis valleys! 🌴🌊",
          "It connects historic sandy fortresses that look like giant castles from a fairy tale! 🏰"
        ]
      }
    ]
  },
  {
    id: "TH",
    countryName: "Thailand",
    capital: "Bangkok",
    flagEmoji: "🇹🇭",
    trains: [
      {
        name: "SRT Special Express (Utra Withi)",
        type: "🌴 Tropical Temple Sleeper",
        photoUrl: thailandImg,
        funFacts: [
          "⚡ Top Speed: Cruises through tropical fields at a smooth 75 mph! ⚡",
          "This beautiful red and silver passenger train takes you on a magical journey from the big city of Bangkok all the way to northern mountain temples! 🛕",
          "It drives past giant green rice fields, coconut palm trees, and even crosses bridges right over floating water markets! 🥥🌊",
          "It has cozy sleeper rooms with personal TV screens where children can watch cartoons while riding!"
        ]
      }
    ]
  },
  {
    id: "LA",
    countryName: "Laos",
    capital: "Vientiane",
    flagEmoji: "🇱🇦",
    trains: [
      {
        name: "Lane Xang Express (LCR)",
        type: "🐘 Million Elephant Bullet Train",
        photoUrl: laosImg,
        funFacts: [
          "⚡ Top Speed: Flies across the mountains at an amazing 100 mph! ⚡",
          "This sleek bullet train is named 'Lane Xang', which means 'A Million Elephants' in the beautiful Lao language! 🐘🐘",
          "It zooms through 75 dark mountain tunnels and crosses giant bridges high above the wide Mekong River! 🌊⛰️",
          "It is painted red, white, and blue to match the beautiful flag of Laos! 🇱🇦"
        ]
      }
    ]
  },
  {
    id: "SG",
    countryName: "Singapore",
    capital: "Singapore",
    flagEmoji: "🇸🇬",
    trains: [
      {
        name: "Singapore MRT",
        type: "🤖 Futuristic Driverless Metro",
        photoUrl: singaporeImg,
        funFacts: [
          "⚡ Top Speed: Glides between skyscrapers at 50 mph! ⚡",
          "This futuristic train is completely driverless! It drives itself using super-smart computers! 🤖",
          "Because there is no driver cabin, children can stand right at the very front window and pretend to drive the train! 🚄",
          "It zooms underground and glides high on tracks past giant futuristic glowing 'Supertrees' and indoor waterfalls! 🌳💦"
        ]
      }
    ]
  },
  {
    id: "HR",
    countryName: "Croatia",
    capital: "Zagreb",
    flagEmoji: "🇭🇷",
    trains: [
      {
        name: "Bratislava-Split Holiday Express",
        type: "🛌 Overnight Holiday Sleeper Train",
        photoUrl: bratislavasplitImg,
        funFacts: [
          "🛌 Top Speed: Chugs under the stars at a cozy 75 mph! 🛌",
          "This is a magical overnight 'rolling hotel' train that carries families to their sunny summer holidays while they sleep! 🛌🌟",
          "You can sleep in double-decker bunk beds, eat breakfast in bed, and wake up looking right at the deep blue ocean! 🥐🌊",
          "It has special giant cargo cars at the very back that carry real family cars and bicycles along for the trip! 🚗🚲"
        ]
      }
    ]
  },
  {
    id: "JO",
    countryName: "Jordan",
    capital: "Amman",
    flagEmoji: "🇯🇴",
    trains: [
      {
        name: "Hedjaz Jordan Railway",
        type: "🚂 Desert Steam Adventure Train",
        photoUrl: jordanImg,
        funFacts: [
          "🌳 Top Speed: Historic desert steam chugger at 30 mph! 🌳",
          "This is a real, 100-year-old historic steam train chugging through the giant red sand dunes of the Wadi Rum desert! 🏜️🚂",
          "It blows a loud steam whistle and passes camel caravans traveling across the hot desert! 🐫💨",
          "This desert is so red and sandy that it looks like the surface of the planet Mars! 🪐🎒"
        ]
      }
    ]
  }
];
