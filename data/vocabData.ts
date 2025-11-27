
import { VocabWord } from '../types';

export const VOCAB_DATA: VocabWord[] = [
  // ==========================================
  // GRADE 1: Basics (Phonics, Numbers 1-10, Colors, Basic Animals)
  // ==========================================
  { word: 'apple', chinese: '蘋果', sentence: 'This is a red ____.', category: 'food', grade: 1 },
  { word: 'ant', chinese: '螞蟻', sentence: 'The ____ is very small.', category: 'animals', grade: 1 },
  { word: 'bag', chinese: '書包/袋子', sentence: 'My ____ is blue.', category: 'school', grade: 1 },
  { word: 'book', chinese: '書', sentence: 'Open your ____.', category: 'school', grade: 1 },
  { word: 'box', chinese: '盒子', sentence: 'What is in the ____?', category: 'school', grade: 1 },
  { word: 'cat', chinese: '貓', sentence: 'The ____ says meow.', category: 'animals', grade: 1 },
  { word: 'cup', chinese: '杯子', sentence: 'I have a pink ____.', category: 'food', grade: 1 },
  { word: 'dog', chinese: '狗', sentence: 'The ____ is cute.', category: 'animals', grade: 1 },
  { word: 'egg', chinese: '蛋', sentence: 'I eat an ____.', category: 'food', grade: 1 },
  { word: 'fish', chinese: '魚', sentence: 'The ____ can swim.', category: 'animals', grade: 1 },
  { word: 'girl', chinese: '女孩', sentence: 'She is a happy ____.', category: 'people', grade: 1 },
  { word: 'boy', chinese: '男孩', sentence: 'He is a tall ____.', category: 'people', grade: 1 },
  { word: 'hat', chinese: '帽子', sentence: 'I wear a ____.', category: 'clothes', grade: 1 },
  { word: 'ink', chinese: '墨水', sentence: 'The ____ is black.', category: 'school', grade: 1 },
  { word: 'jet', chinese: '噴射機', sentence: 'Look at the ____!', category: 'transport', grade: 1 },
  { word: 'kite', chinese: '風箏', sentence: 'Fly a ____ in the park.', category: 'actions', grade: 1 },
  { word: 'lion', chinese: '獅子', sentence: 'The ____ is the king.', category: 'animals', grade: 1 },
  { word: 'monkey', chinese: '猴子', sentence: 'The ____ likes bananas.', category: 'animals', grade: 1 },
  { word: 'bird', chinese: '鳥', sentence: 'The ____ can fly.', category: 'animals', grade: 1 },
  { word: 'tiger', chinese: '老虎', sentence: 'The ____ can roar.', category: 'animals', grade: 1 },
  
  // Colors
  { word: 'red', chinese: '紅色的', sentence: 'I like the color ____.', category: 'colors', grade: 1 },
  { word: 'blue', chinese: '藍色的', sentence: 'The sky is ____.', category: 'colors', grade: 1 },
  { word: 'yellow', chinese: '黃色的', sentence: 'Bananas are ____.', category: 'colors', grade: 1 },
  { word: 'green', chinese: '綠色的', sentence: 'Trees are ____.', category: 'colors', grade: 1 },
  { word: 'black', chinese: '黑色的', sentence: 'My hair is ____.', category: 'colors', grade: 1 },
  { word: 'white', chinese: '白色的', sentence: 'The cloud is ____.', category: 'colors', grade: 1 },

  // Numbers 1-10
  { word: 'one', chinese: '一', sentence: 'I have ____ nose.', category: 'numbers', grade: 1 },
  { word: 'two', chinese: '二', sentence: 'I have ____ eyes.', category: 'numbers', grade: 1 },
  { word: 'three', chinese: '三', sentence: 'There are ____ pigs.', category: 'numbers', grade: 1 },
  { word: 'four', chinese: '四', sentence: 'A dog has ____ legs.', category: 'numbers', grade: 1 },
  { word: 'five', chinese: '五', sentence: 'I have ____ fingers.', category: 'numbers', grade: 1 },
  { word: 'six', chinese: '六', sentence: 'There are ____ apples.', category: 'numbers', grade: 1 },
  { word: 'seven', chinese: '七', sentence: 'There are ____ days in a week.', category: 'numbers', grade: 1 },
  { word: 'eight', chinese: '八', sentence: 'It is ____ o\'clock.', category: 'numbers', grade: 1 },
  { word: 'nine', chinese: '九', sentence: 'I am ____ years old.', category: 'numbers', grade: 1 },
  { word: 'ten', chinese: '十', sentence: 'Count to ____.', category: 'numbers', grade: 1 },

  // ==========================================
  // GRADE 2: Family, Body Basics, Simple Adjectives, Nature
  // ==========================================
  { word: 'mom', chinese: '媽媽', sentence: 'I love my ____.', category: 'people', grade: 2 },
  { word: 'dad', chinese: '爸爸', sentence: 'My ____ is strong.', category: 'people', grade: 2 },
  { word: 'grandpa', chinese: '爺爺/外公', sentence: 'My ____ is old.', category: 'people', grade: 2 },
  { word: 'grandma', chinese: '奶奶/外婆', sentence: 'My ____ is kind.', category: 'people', grade: 2 },
  { word: 'brother', chinese: '兄弟', sentence: 'He is my ____.', category: 'people', grade: 2 },
  { word: 'sister', chinese: '姊妹', sentence: 'She is my ____.', category: 'people', grade: 2 },
  { word: 'baby', chinese: '嬰兒', sentence: 'The ____ is sleeping.', category: 'people', grade: 2 },
  
  // Body
  { word: 'head', chinese: '頭', sentence: 'Touch your ____.', category: 'body', grade: 2 },
  { word: 'hand', chinese: '手', sentence: 'Clap your ____s.', category: 'body', grade: 2 },
  { word: 'nose', chinese: '鼻子', sentence: 'Point to your ____.', category: 'body', grade: 2 },
  { word: 'mouth', chinese: '嘴巴', sentence: 'Open your ____.', category: 'body', grade: 2 },
  { word: 'eye', chinese: '眼睛', sentence: 'Close your ____s.', category: 'body', grade: 2 },
  { word: 'ear', chinese: '耳朵', sentence: 'Touch your ____s.', category: 'body', grade: 2 },
  { word: 'leg', chinese: '腿', sentence: 'My ____ hurts.', category: 'body', grade: 2 },
  { word: 'foot', chinese: '腳', sentence: 'Stomp your ____.', category: 'body', grade: 2 },

  // Adjectives
  { word: 'big', chinese: '大的', sentence: 'The elephant is ____.', category: 'colors', grade: 2 }, 
  { word: 'small', chinese: '小的', sentence: 'The ant is ____.', category: 'colors', grade: 2 },
  { word: 'tall', chinese: '高的', sentence: 'My dad is ____.', category: 'people', grade: 2 },
  { word: 'short', chinese: '矮的/短的', sentence: 'The ruler is ____.', category: 'school', grade: 2 },
  { word: 'long', chinese: '長的', sentence: 'The snake is ____.', category: 'animals', grade: 2 },
  { word: 'fat', chinese: '胖的', sentence: 'The pig is ____.', category: 'animals', grade: 2 },
  { word: 'thin', chinese: '瘦的', sentence: 'The boy is ____.', category: 'people', grade: 2 },

  // Animals & Nature
  { word: 'pig', chinese: '豬', sentence: 'The ____ is pink.', category: 'animals', grade: 2 },
  { word: 'fox', chinese: '狐狸', sentence: 'The ____ is smart.', category: 'animals', grade: 2 },
  { word: 'zebra', chinese: '斑馬', sentence: 'The ____ is black and white.', category: 'animals', grade: 2 },
  { word: 'bear', chinese: '熊', sentence: 'The ____ likes honey.', category: 'animals', grade: 2 },
  { word: 'tree', chinese: '樹', sentence: 'Climb the ____.', category: 'places', grade: 2 },
  { word: 'flower', chinese: '花', sentence: 'Smell the ____.', category: 'places', grade: 2 },
  { word: 'ball', chinese: '球', sentence: 'Kick the ____.', category: 'actions', grade: 2 },

  // ==========================================
  // GRADE 3: School Life, Fruit, Feelings, Abilities (Can)
  // ==========================================
  { word: 'pencil', chinese: '鉛筆', sentence: 'I write with a ____.', category: 'school', grade: 3 },
  { word: 'pen', chinese: '原子筆', sentence: 'Can I borrow a ____?', category: 'school', grade: 3 },
  { word: 'ruler', chinese: '尺', sentence: 'The ____ is long.', category: 'school', grade: 3 },
  { word: 'eraser', chinese: '橡皮擦', sentence: 'Use an ____ to fix it.', category: 'school', grade: 3 },
  { word: 'marker', chinese: '彩色筆/麥克筆', sentence: 'Color with a ____.', category: 'school', grade: 3 },
  { word: 'desk', chinese: '書桌', sentence: 'Sit at your ____.', category: 'school', grade: 3 },
  { word: 'chair', chinese: '椅子', sentence: 'Sit on the ____.', category: 'school', grade: 3 },
  
  // Food & Fruit
  { word: 'banana', chinese: '香蕉', sentence: 'Monkeys like ____s.', category: 'food', grade: 3 },
  { word: 'orange', chinese: '柳橙', sentence: 'An ____ is sweet.', category: 'food', grade: 3 },
  { word: 'papaya', chinese: '木瓜', sentence: 'Do you like ____?', category: 'food', grade: 3 },
  { word: 'watermelon', chinese: '西瓜', sentence: 'The ____ is big and green.', category: 'food', grade: 3 },
  { word: 'grapes', chinese: '葡萄', sentence: 'Purple ____ are yummy.', category: 'food', grade: 3 },
  { word: 'lemon', chinese: '檸檬', sentence: 'The ____ is sour.', category: 'food', grade: 3 },

  // Feelings
  { word: 'happy', chinese: '快樂的', sentence: 'I am ____ today.', category: 'feelings', grade: 3 },
  { word: 'sad', chinese: '難過的', sentence: 'Don\'t be ____.', category: 'feelings', grade: 3 },
  { word: 'tired', chinese: '累的', sentence: 'I am ____ after running.', category: 'feelings', grade: 3 },
  { word: 'angry', chinese: '生氣的', sentence: 'He is ____.', category: 'feelings', grade: 3 },
  { word: 'sick', chinese: '生病的', sentence: 'I feel ____.', category: 'feelings', grade: 3 },

  // Actions
  { word: 'run', chinese: '跑', sentence: 'I can ____ fast.', category: 'actions', grade: 3 },
  { word: 'jump', chinese: '跳', sentence: '____ up high!', category: 'actions', grade: 3 },
  { word: 'swim', chinese: '游泳', sentence: 'Can you ____?', category: 'actions', grade: 3 },
  { word: 'dance', chinese: '跳舞', sentence: 'Let\'s ____ together.', category: 'actions', grade: 3 },
  { word: 'sing', chinese: '唱歌', sentence: 'She can ____ well.', category: 'actions', grade: 3 },
  { word: 'read', chinese: '閱讀', sentence: 'I ____ a book.', category: 'actions', grade: 3 },
  { word: 'draw', chinese: '畫畫', sentence: 'I ____ a picture.', category: 'actions', grade: 3 },

  // ==========================================
  // GRADE 4: Weather, Time, Transport, Clothes
  // ==========================================
  { word: 'sunny', chinese: '晴朗的', sentence: 'It is ____ today.', category: 'weather', grade: 4 },
  { word: 'rainy', chinese: '下雨的', sentence: 'Bring an umbrella on ____ days.', category: 'weather', grade: 4 },
  { word: 'cloudy', chinese: '多雲的', sentence: 'It is ____.', category: 'weather', grade: 4 },
  { word: 'windy', chinese: '颳風的', sentence: 'It is ____ outside.', category: 'weather', grade: 4 },
  { word: 'snowy', chinese: '下雪的', sentence: 'It is cold and ____.', category: 'weather', grade: 4 },
  { word: 'hot', chinese: '熱的', sentence: 'Summer is ____.', category: 'weather', grade: 4 },
  { word: 'cold', chinese: '冷的', sentence: 'Winter is ____.', category: 'weather', grade: 4 },

  // Clothes
  { word: 'jacket', chinese: '夾克', sentence: 'Put on your ____.', category: 'clothes', grade: 4 },
  { word: 'shirt', chinese: '襯衫', sentence: 'He wears a white ____.', category: 'clothes', grade: 4 },
  { word: 'dress', chinese: '洋裝', sentence: 'She has a pretty ____.', category: 'clothes', grade: 4 },
  { word: 'skirt', chinese: '裙子', sentence: 'The ____ is pink.', category: 'clothes', grade: 4 },
  { word: 'pants', chinese: '褲子', sentence: 'My ____ are blue.', category: 'clothes', grade: 4 },
  { word: 'shoes', chinese: '鞋子', sentence: 'Where are my ____?', category: 'clothes', grade: 4 },
  { word: 'socks', chinese: '襪子', sentence: 'I need clean ____.', category: 'clothes', grade: 4 },
  { word: 'cap', chinese: '棒球帽', sentence: 'He wears a ____.', category: 'clothes', grade: 4 },

  // Transport
  { word: 'bus', chinese: '公車', sentence: 'I go to school by ____.', category: 'transport', grade: 4 },
  { word: 'bike', chinese: '腳踏車', sentence: 'I ride a ____.', category: 'transport', grade: 4 },
  { word: 'car', chinese: '汽車', sentence: 'My dad drives a ____.', category: 'transport', grade: 4 },
  { word: 'train', chinese: '火車', sentence: 'The ____ is fast.', category: 'transport', grade: 4 },
  { word: 'scooter', chinese: '機車', sentence: 'Wear a helmet on a ____.', category: 'transport', grade: 4 },
  { word: 'ship', chinese: '船', sentence: 'The ____ is on the sea.', category: 'transport', grade: 4 },
  { word: 'taxi', chinese: '計程車', sentence: 'Take a ____ home.', category: 'transport', grade: 4 },

  // Time & Numbers
  { word: 'eleven', chinese: '十一', sentence: 'It is ____ o\'clock.', category: 'time', grade: 4 },
  { word: 'twelve', chinese: '十二', sentence: 'It is ____ thirty.', category: 'time', grade: 4 },
  { word: 'thirteen', chinese: '十三', sentence: 'I am ____ years old.', category: 'time', grade: 4 },
  { word: 'twenty', chinese: '二十', sentence: 'There are ____ students.', category: 'time', grade: 4 },
  { word: 'thirty', chinese: '三十', sentence: 'My mom is ____.', category: 'time', grade: 4 },

  { word: 'hungry', chinese: '餓的', sentence: 'I am ____. I want food.', category: 'feelings', grade: 4 },
  { word: 'thirsty', chinese: '渴的', sentence: 'I am ____. I want water.', category: 'feelings', grade: 4 },

  // ==========================================
  // GRADE 5: Daily Routine, Subjects, Locations, Food (Meals)
  // ==========================================
  { word: 'get up', chinese: '起床', sentence: 'I ____ at six thirty.', category: 'daily', grade: 5 },
  { word: 'have breakfast', chinese: '吃早餐', sentence: 'I ____ at seven.', category: 'daily', grade: 5 },
  { word: 'go to school', chinese: '去上學', sentence: 'I ____ at seven thirty.', category: 'daily', grade: 5 },
  { word: 'have lunch', chinese: '吃午餐', sentence: 'We ____ at twelve.', category: 'daily', grade: 5 },
  { word: 'go home', chinese: '回家', sentence: 'I ____ at four.', category: 'daily', grade: 5 },
  { word: 'do homework', chinese: '做功課', sentence: 'I ____ every day.', category: 'daily', grade: 5 },
  { word: 'have dinner', chinese: '吃晚餐', sentence: 'We ____ together.', category: 'daily', grade: 5 },
  { word: 'take a shower', chinese: '洗澡', sentence: 'I ____ in the evening.', category: 'daily', grade: 5 },
  { word: 'go to bed', chinese: '去睡覺', sentence: 'I ____ at nine.', category: 'daily', grade: 5 },
  
  // Subjects
  { word: 'Chinese', chinese: '國語', sentence: 'I like ____ class.', category: 'school', grade: 5 },
  { word: 'English', chinese: '英語', sentence: '____ is fun.', category: 'school', grade: 5 },
  { word: 'Math', chinese: '數學', sentence: '____ is hard.', category: 'school', grade: 5 },
  { word: 'Science', chinese: '自然', sentence: 'I love ____.', category: 'school', grade: 5 },
  { word: 'Art', chinese: '美勞', sentence: 'We draw in ____ class.', category: 'school', grade: 5 },
  { word: 'Music', chinese: '音樂', sentence: 'We sing in ____ class.', category: 'school', grade: 5 },
  { word: 'PE', chinese: '體育', sentence: 'We run in ____ class.', category: 'school', grade: 5 },
  
  // Locations
  { word: 'library', chinese: '圖書館', sentence: 'Be quiet in the ____.', category: 'places', grade: 5 },
  { word: 'park', chinese: '公園', sentence: 'Let\'s play in the ____.', category: 'places', grade: 5 },
  { word: 'zoo', chinese: '動物園', sentence: 'There are lions in the ____.', category: 'places', grade: 5 },
  { word: 'hospital', chinese: '醫院', sentence: 'Doctors work in the ____.', category: 'places', grade: 5 },
  { word: 'bank', chinese: '銀行', sentence: 'My mom goes to the ____.', category: 'places', grade: 5 },
  { word: 'post office', chinese: '郵局', sentence: 'Mail a letter at the ____.', category: 'places', grade: 5 },
  { word: 'restaurant', chinese: '餐廳', sentence: 'We eat at a ____.', category: 'places', grade: 5 },
  { word: 'movie theater', chinese: '電影院', sentence: 'Watch a movie at the ____.', category: 'places', grade: 5 },
  { word: 'bakery', chinese: '麵包店', sentence: 'Buy bread at the ____.', category: 'places', grade: 5 },
  { word: 'supermarket', chinese: '超市', sentence: 'Buy food at the ____.', category: 'places', grade: 5 },

  // Food
  { word: 'hamburger', chinese: '漢堡', sentence: 'I want a ____.', category: 'food', grade: 5 },
  { word: 'sandwich', chinese: '三明治', sentence: 'Ham and egg ____.', category: 'food', grade: 5 },
  { word: 'noodles', chinese: '麵', sentence: 'Beef ____ are yummy.', category: 'food', grade: 5 },
  { word: 'rice', chinese: '米飯', sentence: 'I eat ____ for dinner.', category: 'food', grade: 5 },
  { word: 'soup', chinese: '湯', sentence: 'Hot corn ____.', category: 'food', grade: 5 },
  { word: 'dumplings', chinese: '水餃', sentence: 'I like ____.', category: 'food', grade: 5 },
  { word: 'steak', chinese: '牛排', sentence: 'The ____ is delicious.', category: 'food', grade: 5 },
  { word: 'pizza', chinese: '披薩', sentence: 'Let\'s share a ____.', category: 'food', grade: 5 },

  // ==========================================
  // GRADE 6: Occupations, Past Tense, Seasons, Advanced
  // ==========================================
  { word: 'doctor', chinese: '醫生', sentence: 'The ____ helps sick people.', category: 'people', grade: 6 },
  { word: 'nurse', chinese: '護理師', sentence: 'The ____ works in a hospital.', category: 'people', grade: 6 },
  { word: 'teacher', chinese: '老師', sentence: 'My ____ is nice.', category: 'people', grade: 6 },
  { word: 'cook', chinese: '廚師', sentence: 'The ____ makes food.', category: 'people', grade: 6 },
  { word: 'police officer', chinese: '警察', sentence: 'Ask the ____ for help.', category: 'people', grade: 6 },
  { word: 'singer', chinese: '歌手', sentence: 'She wants to be a ____.', category: 'people', grade: 6 },
  { word: 'farmer', chinese: '農夫', sentence: 'The ____ grows rice.', category: 'people', grade: 6 },
  { word: 'writer', chinese: '作家', sentence: 'She is a famous ____.', category: 'people', grade: 6 },
  { word: 'actor', chinese: '演員', sentence: 'He is a cool ____.', category: 'people', grade: 6 },
  
  // Weather & Seasons
  { word: 'spring', chinese: '春天', sentence: 'It is warm in ____.', category: 'weather', grade: 6 },
  { word: 'summer', chinese: '夏天', sentence: 'It is hot in ____.', category: 'weather', grade: 6 },
  { word: 'fall', chinese: '秋天', sentence: 'It is cool in ____.', category: 'weather', grade: 6 },
  { word: 'winter', chinese: '冬天', sentence: 'It is cold in ____.', category: 'weather', grade: 6 },
  
  // Time (Past Tense Indicators)
  { word: 'yesterday', chinese: '昨天', sentence: 'I was home ____.', category: 'time', grade: 6 },
  { word: 'today', chinese: '今天', sentence: '____ is Monday.', category: 'time', grade: 6 },
  { word: 'tomorrow', chinese: '明天', sentence: 'I will go ____.', category: 'time', grade: 6 },
  { word: 'last night', chinese: '昨晚', sentence: 'I slept well ____.', category: 'time', grade: 6 },
  { word: 'next week', chinese: '下週', sentence: 'See you ____.', category: 'time', grade: 6 },
  { word: 'before', chinese: '以前', sentence: 'I met him ____.', category: 'time', grade: 6 },
  { word: 'ago', chinese: '之前', sentence: 'Two years ____.', category: 'time', grade: 6 },

  // Places
  { word: 'museum', chinese: '博物館', sentence: 'Visit the ____.', category: 'places', grade: 6 },
  { word: 'night market', chinese: '夜市', sentence: 'Let\'s go to the ____.', category: 'places', grade: 6 },
  { word: 'department store', chinese: '百貨公司', sentence: 'Shop at the ____.', category: 'places', grade: 6 },
  { word: 'airport', chinese: '機場', sentence: 'Go to the ____.', category: 'places', grade: 6 },
  { word: 'hotel', chinese: '飯店', sentence: 'Stay in a ____.', category: 'places', grade: 6 },

  // Adjectives
  { word: 'expensive', chinese: '昂貴的', sentence: 'The car is ____.', category: 'feelings', grade: 6 },
  { word: 'cheap', chinese: '便宜的', sentence: 'The pen is ____.', category: 'feelings', grade: 6 },
  { word: 'exciting', chinese: '令人興奮的', sentence: 'The game is ____.', category: 'feelings', grade: 6 },
  { word: 'boring', chinese: '無聊的', sentence: 'The movie is ____.', category: 'feelings', grade: 6 },
  { word: 'delicious', chinese: '美味的', sentence: 'The food is ____.', category: 'food', grade: 6 },
  { word: 'beautiful', chinese: '美麗的', sentence: 'The flower is ____.', category: 'colors', grade: 6 },
  { word: 'strong', chinese: '強壯的', sentence: 'He is ____.', category: 'colors', grade: 6 },
];

export const CATEGORIES = [
  { 
    id: 'all', 
    label: '全部單字', 
    icon: '📚',
    videos: []
  },
  { 
    id: 'daily', 
    label: '生活作息', 
    icon: '⏰',
    videos: [
      { title: 'Daily Routines Song', id: 'eUXkj6j6Ezw' },
      { title: 'Talking about Daily Routine', id: 'M4FMEllZQQw' }
    ]
  },
  { 
    id: 'school', 
    label: '學校科目/文具', 
    icon: '🏫',
    videos: [
      { title: 'School Supplies Song', id: '41cJ0mqWses' },
      { title: 'School Subjects Song', id: 'AnZxeX_8mwk' }
    ] 
  },
  { 
    id: 'food', 
    label: '食物', 
    icon: '🍔',
    videos: [
      { title: 'Do You Like Broccoli Ice Cream?', id: 'frN3nvhIHUk' },
      { title: 'What Do You Want To Eat?', id: 'lW5TXrKBSq4' }
    ]
  },
  { 
    id: 'weather', 
    label: '天氣/季節', 
    icon: '🌤️',
    videos: [
      { title: 'How\'s The Weather?', id: 'rD6FRDd9Hew' },
      { title: 'The Seasons Song', id: '8ZjpI6fgYSY' }
    ]
  },
  { 
    id: 'places', 
    label: '地點', 
    icon: '🏥',
    videos: [
      { title: 'Places in a City', id: 'fPhyiq4fF0w' },
      { title: 'Where are you going?', id: 'LulXS8Xy_sY' }
    ]
  },
  { 
    id: 'actions', 
    label: '動作', 
    icon: '🏃',
    videos: [
      { title: 'Action Verbs Song', id: 'hzo9me2fdzg' },
      { title: 'Can You Swim?', id: '_Ir0Mc6Qilo' }
    ]
  },
  { 
    id: 'animals', 
    label: '動物', 
    icon: '🐶',
    videos: [
      { title: 'Walking In The Jungle', id: 'GoSq-yZcJ-4' },
      { title: 'I Have A Pet', id: 'pWepfJ-8XU0' }
    ]
  },
  { 
    id: 'colors', 
    label: '顏色/形容詞', 
    icon: '🎨',
    videos: [
      { title: 'The Rainbow Song', id: 'tRNy2i75tCc' },
      { title: 'Opposites Song', id: 'HqbYDlaY43Q' }
    ]
  },
  { 
    id: 'people', 
    label: '人物/職業', 
    icon: '👨‍👩‍👧',
    videos: [
      { title: 'Family Members Song', id: 'd_WQEw13TCo' },
      { title: 'Jobs Song', id: 'ckKQclquAXU' }
    ]
  },
  { 
    id: 'body', 
    label: '身體部位', 
    icon: '💪',
    videos: [
      { title: 'Head Shoulders Knees & Toes', id: 'h4eueDYPTIg' }
    ]
  },
  { 
    id: 'transport', 
    label: '交通工具', 
    icon: '🚌',
    videos: [
      { title: 'Transportation Song', id: 'UtVk0hO4G4o' }
    ]
  },
  { 
    id: 'clothes', 
    label: '衣物', 
    icon: '👕',
    videos: [
      { title: 'Clothing Song', id: 'taoCF1cKZSY' }
    ]
  },
  { 
    id: 'time', 
    label: '時間/數字', 
    icon: '⏳',
    videos: [
      { title: 'Numbers Song 1-20', id: 'D0Ajq682yrA' },
      { title: 'What Time Is It?', id: '0Yq_rztquuU' }
    ]
  },
  { 
    id: 'feelings', 
    label: '情緒/感受', 
    icon: '😊',
    videos: [
      { title: 'If You\'re Happy', id: 'l4WNrvVjiTw' },
      { title: 'Feelings Song', id: '-J7HcVLsCrY' }
    ]
  },
];
