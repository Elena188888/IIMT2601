    // ===== DATA =====
    const bars = [
      { id:'bar-velvet', name:'The Velvet Room', district:'Central', address:'12 Pedder Street', map:{x:46,y:26},
        drinks:[
          {id:'VR01',name:'Velvet Martini',price:128,abv:'Alcoholic',ingredients:'Gin / dry vermouth / olive',tags:['smooth','classic'],occasions:['Date night'],prompt:'velvet martini in coupe glass'},
          {id:'VR02',name:'Silk Sour',price:132,abv:'Alcoholic',ingredients:'Bourbon / lemon / egg white',tags:['sour','creamy'],occasions:['Solo'],prompt:'whiskey sour cocktail egg white'},
          {id:'VR03',name:'Golden Fizz',price:120,abv:'Alcoholic',ingredients:'Gin / lemon / soda',tags:['citrusy','refreshing'],occasions:['Friends'],prompt:'gin fizz cocktail tall glass'}
        ] },
      { id:'bar-amber', name:'Amber & Oak', district:'Soho', address:'28 Staunton Street', map:{x:42,y:32},
        drinks:[
          {id:'AO01',name:'Smoked Old Fashioned',price:145,abv:'Alcoholic',ingredients:'Bourbon / maple / bitters / smoke',tags:['smoky','bitter','spirit-forward'],occasions:['Date night'],prompt:'smoked old fashioned cocktail'},
          {id:'AO02',name:'Honey Highball',price:118,abv:'Alcoholic',ingredients:'Whisky / honey / soda',tags:['sweet','light'],occasions:['Friends'],prompt:'whisky highball cocktail'},
          {id:'AO03',name:'Spiced Negroni',price:138,abv:'Alcoholic',ingredients:'Gin / Campari / spiced vermouth',tags:['bitter','herbal'],occasions:['Classic discovery'],prompt:'negroni cocktail glass'}
        ] },
      { id:'bar-citrus', name:'Citrus & Salt', district:'Wan Chai', address:'14 Lee Tung Avenue', map:{x:72,y:38},
        drinks:[
          {id:'CS01',name:'Yuzu Margarita',price:130,abv:'Alcoholic',ingredients:'Tequila / yuzu / lime / salt',tags:['citrusy','tangy'],occasions:['Friends'],prompt:'yuzu margarita cocktail'},
          {id:'CS02',name:'Sea Breeze Spritz',price:125,abv:'Alcoholic',ingredients:'Vodka / cranberry / grapefruit',tags:['fruity','refreshing'],occasions:['Relaxed'],prompt:'sea breeze cocktail pink'},
          {id:'CS03',name:'Smoked Paloma',price:135,abv:'Alcoholic',ingredients:'Mezcal / grapefruit / lime',tags:['smoky','citrusy'],occasions:['Adventurous'],prompt:'mezcal paloma cocktail'}
        ] },
      { id:'bar-moonlit', name:'Moonlit Bar', district:'Tsim Sha Tsui', address:'8 Minden Avenue', map:{x:50,y:72},
        drinks:[
          {id:'MB01',name:'Lunar Negroni',price:140,abv:'Alcoholic',ingredients:'Gin / violet / vermouth',tags:['floral','bitter'],occasions:['Date night'],prompt:'purple floral negroni'},
          {id:'MB02',name:'Velvet Eclipse',price:150,abv:'Alcoholic',ingredients:'Rum / blackberry / vanilla',tags:['fruity','sweet'],occasions:['Celebration'],prompt:'dark berry rum cocktail'},
          {id:'MB03',name:'Midnight Sour',price:128,abv:'Alcoholic',ingredients:'Whisky / lemon / charcoal',tags:['sour','mysterious'],occasions:['Solo'],prompt:'black charcoal whisky sour'}
        ] },
      { id:'bar-botanica', name:'Botanica', district:'Sheung Wan', address:'32 Tai Ping Shan Street', map:{x:36,y:30},
        drinks:[
          {id:'BT01',name:'Garden Spritz',price:122,abv:'Alcoholic',ingredients:'Gin / cucumber / elderflower',tags:['herbal','refreshing'],occasions:['Relaxed'],prompt:'cucumber gin spritz'},
          {id:'BT02',name:'Lavender Fizz',price:130,abv:'Alcoholic',ingredients:'Vodka / lavender / lemon',tags:['floral','creamy'],occasions:['Date night'],prompt:'lavender cocktail fizz'},
          {id:'BT03',name:'Sage Smash',price:128,abv:'Alcoholic',ingredients:'Gin / sage / citrus',tags:['herbal','citrusy'],occasions:['Curious'],prompt:'sage gin smash cocktail'}
        ] },
      { id:'bar-kirra', name:'Kirra', district:'Causeway Bay', address:'7 Sun Street', map:{x:66,y:28},
        drinks:[
          {id:'KR01',name:'Coconut Mojito',price:125,abv:'Alcoholic',ingredients:'Rum / coconut / mint / lime',tags:['tropical','refreshing'],occasions:['Friends'],prompt:'coconut mojito cocktail'},
          {id:'KR02',name:'Spicy Mango',price:135,abv:'Alcoholic',ingredients:'Tequila / mango / chili',tags:['spicy','fruity'],occasions:['Adventurous'],prompt:'spicy mango margarita'},
          {id:'KR03',name:'Lychee Martini',price:130,abv:'Alcoholic',ingredients:'Vodka / lychee / elderflower',tags:['sweet','floral'],occasions:['Celebration'],prompt:'lychee martini cocktail'}
        ] },
      { id:'bar-silhouette', name:'Silhouette', district:'Central', address:'9 Queen Victoria Street', map:{x:50,y:22},
        drinks:[
          {id:'SL01',name:'Espresso Martini',price:138,abv:'Alcoholic',ingredients:'Vodka / coffee / vanilla',tags:['rich','creamy'],occasions:['Solo'],prompt:'espresso martini cocktail'},
          {id:'SL02',name:'White Negroni',price:142,abv:'Alcoholic',ingredients:'Gin / Suze / Lillet',tags:['bitter','herbal'],occasions:['Classic discovery'],prompt:'white negroni cocktail'},
          {id:'SL03',name:'Truffle Sour',price:155,abv:'Alcoholic',ingredients:'Whisky / truffle / lemon',tags:['savory','complex'],occasions:['Foodies'],prompt:'truffle whisky sour'}
        ] },
      { id:'bar-sundown', name:'Sundown', district:'Soho', address:'18 Peel Street', map:{x:40,y:34},
        drinks:[
          {id:'SD01',name:'Sunset Boulevard',price:130,abv:'Alcoholic',ingredients:'Aperol / gin / grapefruit',tags:['citrusy','bitter'],occasions:['Friends'],prompt:'aperol grapefruit cocktail'},
          {id:'SD02',name:'Golden Hour Sour',price:128,abv:'Alcoholic',ingredients:'Rum / passionfruit / lime',tags:['fruity','sour'],occasions:['Relaxed'],prompt:'passionfruit rum sour'},
          {id:'SD03',name:'Smoked Maple',price:145,abv:'Alcoholic',ingredients:'Bourbon / maple / smoked salt',tags:['smoky','sweet'],occasions:['Date night'],prompt:'smoked maple bourbon cocktail'}
        ] },
      { id:'bar-nomad', name:'Nomad', district:'Wan Chai', address:'22 Ship Street', map:{x:70,y:42},
        drinks:[
          {id:'NM01',name:'Desert Rose',price:132,abv:'Alcoholic',ingredients:'Mezcal / rose / lime',tags:['smoky','floral'],occasions:['Adventurous'],prompt:'mezcal rose cocktail'},
          {id:'NM02',name:'Silk Road',price:140,abv:'Alcoholic',ingredients:'Rum / cardamom / saffron',tags:['spicy','aromatic'],occasions:['Curious'],prompt:'spiced rum cocktail saffron'},
          {id:'NM03',name:'Oasis Cooler',price:120,abv:'Alcoholic',ingredients:'Gin / cucumber / mint',tags:['refreshing','herbal'],occasions:['Relaxed'],prompt:'cucumber mint gin cooler'}
        ] },
      { id:'bar-haven', name:'Haven', district:'Tsim Sha Tsui', address:'1 Austin Road', map:{x:52,y:76},
        drinks:[
          {id:'HV01',name:'Harbour Light',price:135,abv:'Alcoholic',ingredients:'Vodka / lychee / lemon',tags:['fruity','refreshing'],occasions:['Celebration'],prompt:'lychee vodka cocktail'},
          {id:'HV02',name:'Noir & Gold',price:148,abv:'Alcoholic',ingredients:'Rum / coffee / gold leaf',tags:['rich','sweet'],occasions:['Special occasion'],prompt:'coffee rum cocktail gold'},
          {id:'HV03',name:'Jasmine Fizz',price:125,abv:'Alcoholic',ingredients:'Gin / jasmine / soda',tags:['floral','light'],occasions:['Date night'],prompt:'jasmine gin fizz'}
        ] }
    ];

    const moodList = ['Relaxed','Adventurous','Romantic','Curious','Celebratory','Nostalgic','Mysterious'];
    const occasionList = ['Date night','Friends','Solo','Special occasion','Classic discovery','Relaxed'];
    const tasteList = ['Sweet','Sour','Bitter','Herbal','Creamy','Fruity','Smoky','Spicy','Refreshing'];

    const perks = [
      {id:'free-drink',name:'One complimentary signature drink',cost:1000},
      {id:'upgrade',name:'Free premium spirit upgrade',cost:500},
      {id:'tasting',name:'Bar tasting event ticket',cost:800}
    ];

    const drinkImages = [
      'https://www.thecocktaildb.com/images/media/drink/xxyywq1454511117.jpg','https://www.thecocktaildb.com/images/media/drink/rvwrvv1468877323.jpg',
      'https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg','https://www.thecocktaildb.com/images/media/drink/yyrwty1468877498.jpg',
      'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg','https://www.thecocktaildb.com/images/media/drink/wxqpyw1468877677.jpg',
      'https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg','https://www.thecocktaildb.com/images/media/drink/xtuyqv1472669026.jpg',
      'https://www.thecocktaildb.com/images/media/drink/wwpyvr1461919316.jpg','https://www.thecocktaildb.com/images/media/drink/ywxwqs1461867097.jpg',
      'https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg','https://www.thecocktaildb.com/images/media/drink/vqyxqx1472669095.jpg',
      'https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg','https://www.thecocktaildb.com/images/media/drink/i9suxb1582474926.jpg',
      'https://www.thecocktaildb.com/images/media/drink/xvwusr1472669302.jpg','https://www.thecocktaildb.com/images/media/drink/trptts1454514474.jpg',
      'https://www.thecocktaildb.com/images/media/drink/ssxvww1472669166.jpg','https://www.thecocktaildb.com/images/media/drink/wysqut1461867176.jpg',
      'https://www.thecocktaildb.com/images/media/drink/ysqvqp1461867292.jpg','https://www.thecocktaildb.com/images/media/drink/vyrvxt1461919380.jpg',
      'https://www.thecocktaildb.com/images/media/drink/tqxyxx1472719737.jpg','https://www.thecocktaildb.com/images/media/drink/rsvtrr1472668201.jpg',
      'https://www.thecocktaildb.com/images/media/drink/rptuxy1472669372.jpg','https://www.thecocktaildb.com/images/media/drink/l74qo91582480316.jpg',
      'https://www.thecocktaildb.com/images/media/drink/ruxuvp1472669600.jpg','https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      'https://www.thecocktaildb.com/images/media/drink/mr30ob1582479875.jpg','https://www.thecocktaildb.com/images/media/drink/2mcozt1504817403.jpg',
      'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg','https://www.thecocktaildb.com/images/media/drink/smb2oe1582479072.jpg'
    ];

    function hashString(s){ let h=0; for(let i=0;i<s.length;i++) h=((h<<5)-h+s.charCodeAt(i))|0; return Math.abs(h); }
    function imgUrl(prompt){ return drinkImages[hashString(prompt||'drink') % drinkImages.length]; }
    function formatDate(iso){ const d=new Date(iso); return d.toLocaleDateString('en-US',{month:'short',day:'numeric'}); }
    function todayStr(){ return new Date().toISOString().slice(0,10); }
    function addDays(d,n){ const x=new Date(d); x.setDate(x.getDate()+n); return x.toISOString().slice(0,10); }


    // ===== HELPERS =====
    function findDrink(id){ for (const b of bars) for (const d of b.drinks) if (d.id===id) return d; return bars[0].drinks[0]; }
    function findBar(id){ return bars.find(b=>b.id===id) || bars[0]; }
    function findBarForDrink(id){ return bars.find(b=>b.drinks.some(d=>d.id===id)) || bars[0]; }
  