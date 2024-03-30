const categorylist = [
    {
        category: 'Credt',
        image: require('../assets/icon-credit.png'),
    },
    {
        category: 'Holiday',
        image: require('../assets/icon-holiday.png'),
    },
    {
        category: 'Shopping',
        image: require('../assets/icon-shopping.png'),
    },
    {
        category: 'food',
        image: require('../assets/icon-food.png'),
    },
    {
        category: 'education',
        image: require('../assets/icon-edu.png'),
    },
    {
        category: 'transport',
        image: require('../assets/icon-transport.png'),
    },
    {
        category: 'agent',
        image: require('../assets/icon-venue.png'),
    },
    {
        category: 'health',
        image: require('../assets/icon-health.png'),
    }
]

export const mapCategory = (category: string) => {
    const cat = categorylist.find((cat) => cat.category === category);
    return cat?.image;
}