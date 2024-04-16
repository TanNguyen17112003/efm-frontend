const categorylist = [
    {
        category: 'Credit',
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
        category: "Food and Drinks",
        image: require('../assets/icon-food.png')
    },
    {
        category: 'Education',
        image: require('../assets/icon-edu.png'),
    },
    {
        category: 'Transport',
        image: require('../assets/icon-transport.png'),
    },
    {
        category: 'Agent',
        image: require('../assets/icon-venue.png'),
    },
    {
        category: "Health and Beauty",
        image: require('../assets/icon-health.png')
    },
    {
        category: "Entertainment",
        image: require('../assets/icon-game.png')
    },
    {
        category: "Home",
        image: require('../assets/icon-home.png')
    },
    {
        category: "Market",
        image: require('../assets/icon-market.png')
    },
    {
        category: "Dating",
        image: require('../assets/icon-ty.png')
    },
    {
        category: "Salary",
        image: require('../assets/icon-credit.png')
    },
    {
        category: "Other",
        image: require('../assets/icon-other.png')
    }
]
export const mapCategory = (category: string) => {
    const cat = categorylist.find((cat) => cat.category === category);
    return cat?.image;
}