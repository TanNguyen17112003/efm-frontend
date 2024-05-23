interface Activity {
    _id: string;
    category: string;
    content: string;
    amount: number;
    type: string;
    createdAt: Date;
    image?: any;
  }

  interface DetailActivity {
    name: string;
    type: string;
    month: string;
    amount: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
  }