import { Form, redirect } from "react-router-dom";

import { purchaseService } from "./Root";

export const action = async ({request}) => {
    const formData = await request.formData();
    const newCategory = Object.fromEntries(formData)
    await purchaseService.persistCategory(newCategory);
    return redirect('/');
}

const AddNewCategoryPage = () => {

    return (
        <>
        <Form method="post" id="newCategoryForm" className="m-2 p-2 border border-1 border-light rounded-4 text-light">
            <div className="mb-3">
                <label htmlFor="categoryNameInput" className="form-label">Category name: </label>
                <input type="text" className="form-control" id="categoryNameInput" name="categoryName" placeholder="Medical/Food/Car etc." required maxLength={20}/>
            </div>
            <div className="mb-3">
                <label htmlFor="categoryDescriptionInput" className="form-label">Category description</label>
                <textarea className="form-control" id="categoryDescriptionInput" name="description" rows="2" placeholder="Optional"></textarea>
            </div>
            <div className="text-end">
                <button type="submit" className="btn btn-primary">Add new category</button>
            </div>
        </Form>
        </>
    )
};

export default AddNewCategoryPage;