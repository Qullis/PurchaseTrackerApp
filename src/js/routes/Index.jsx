import CategoryCard from "../components/CategoryCard";
import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";

import { purchaseService } from "../services/services"
export async function loader() {
    const purchases = await purchaseService.findAllPurchases();
    const categories = await purchaseService.findAllCategories();
    return {
        purchases, categories
    }
}
const Index = () => {
    //--------find the latest date------------//

    const findLatestDate = (array) => {
        if (array.length > 0) {
            const sorted = array.sort(function (a, b) {
                // Convert the date strings to Date objects
                let dateA = new Date(a);
                let dateB = new Date(b);

                // Subtract the dates to get a value that is either negative, positive, or zero
                return dateB - dateA;
            });

            return sorted[0]
        }
        else {
            return null;
        }

    };
    //-----------------------------------------------------------------------------------------------------//
    //-----map the categories--------//
    const {categories, purchases} = useLoaderData();
    //const categories = [];
    let categoryList = null;
    if (categories.length > 0) {
        categoryList = categories.map((category) => {
            let dates=[];
            let totalSum = 0;
            purchases.forEach((purchase) => {
                if (purchase.categoryId === category.id) {
                    dates.push(purchase.purchaseDate);
                    totalSum += purchase.cost;
                }
            });
            const latestDate = findLatestDate(dates);
            return (
                <CategoryCard key={category.id} category={category.categoryName} totalSum={totalSum} link={'purchases/read/' + category.id} lastUpdated={latestDate} description={category.description} />
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