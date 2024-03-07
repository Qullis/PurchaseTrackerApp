import CategoryCard from "../components/CategoryCard";
import { Link, useLoaderData } from "react-router-dom";

import { purchaseService } from "../services/services"
export async function loader() {
    const purchases = await purchaseService.findAllPurchases();
    const categories = await purchaseService.findAllCategories();
    return {
        purchases, categories
    }
}

const Index = () => {
    const {categories, purchases} = useLoaderData();
    //const categories = [];
    let categoryList = null;
    if (categories.length > 0) {
        categoryList = categories.map((category) => {
            let totalSum = 0;
            purchases.forEach((purchase) => {
                if (purchase.categoryId === category.id) {
                    totalSum += purchase.cost;
                }
            })
            return (
                <CategoryCard key={category.id} category={category.categoryName} totalSum={totalSum} link={'purchases/read/' + category.id} lastUpdated={'22.12.2023'} description={category.description} />
            )
        })
    }
    else (categoryList = (
        <div class="card m-2">
            <h5 class="card-header">Info</h5>
            <div class="card-body">
                <h5 class="card-title">Create a new category</h5>
                <p class="card-text">Welcome! To start using the app and add spendings, first you need to create a new category. Then you can start to add your purchases.</p>
                <Link to={'categories/add'} class="btn btn-primary">Create new category</Link>
            </div>
        </div>
    ))
    return (
        <>
            {categoryList}

        </>
    )
}

export default Index