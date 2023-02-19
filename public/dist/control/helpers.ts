
//----Temporary array for adding alements to the DB----
const product = [
    {
        category: "mascara",
        image: 'images/mascara1.jpg',
        title: 'Loreal',
        price: 55,
    },
    {
        category: "lipstik",
        image: 'images/mascara2.jpg',
        title: 'Dior',
        price: 40,
    },
    {
        category: "lipstik",
        image: 'images/mascara3.jpg',
        title: 'Giorgio Armani',
        price: 80,
    },
    {
        category: "mascara",
        image: 'images/mascara4.jpg',
        title: 'MAC Cosmetics',
        price: 45,
    }
    ,
    {
        category: "mascara",
        image: 'images/mascara5.jpg',
        title: 'Fenty Beauty',
        price: 60,
    },
    {
        category: "mascara",
        image: 'images/mascara6.jpg',
        title: 'Chanel',
        price: 90,
    },
    {
        category: "mascara",
        image: 'images/7mascara7.jpg',
        title: 'Covergirl Outlast',
        price: 35,
    },
    {
        category: "mascara",
        image: 'images/mascara8.jpg',
        title: ' Victoria Beckham',
        price: 45,
    },
    {
        category: "mascara",
        image: 'images/mascara9.jpg',
        title: 'Tom Ford',
        price: 100,
    }
];

//----- Temporal procedure for adding elements to the collection (DB)-----
async function insertProductsIntoDataBase(category: string, image: string, title: string, price: number) {
    try {

        //@ts-ignore
        const { data } = await axios.post("/api/v1/products/insert-products", { category, image, title, price });
        const { success } = data;

        if (!success) {
            console.log("All products were successfuly inserted");
        }
        else {
            console.log("Warning.Error!!!!");
        }

    } catch (error) {
        console.error(error);
    }
}

// ---- Run temporal procedure for adding elements to the collection (DB) 1 time only-----
//   for (let i=0; i < product.length; i++) {
//     insertProductsToCollection(product[i].category, product[i].image, product[i].title, product[i].price)
//     console.log (product[i].category, product[i].image, product[i].title, product[i].price) 
//    }
