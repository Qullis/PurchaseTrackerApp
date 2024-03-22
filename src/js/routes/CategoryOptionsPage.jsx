import { purchaseService } from "../services/services";
import { Form, useLocation, redirect } from "react-router-dom";

import { Dialog } from '@capacitor/dialog';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const category = Object.fromEntries(formData)
    if (category.categoryName) {
        category.id = parseInt(category.id)
        await purchaseService.persistCategory(category)
        return redirect('/purchases/read/' + category.id);
    }
    else if (category.id) {
        category.id = parseInt(category.id)
        const { value } = await Dialog.confirm({
            title: 'Warning!',
            message: `Are you sure you want to delete this category? This will also delete all purchases associated with this category. This action cannot be undone.`,
        });
        if (value) {
            await purchaseService.deleteCategoryById(category.id)
            return redirect('/');
        }
        return false;
    }
    return false;

}

const CategoryOptionsPage = () => {
    const category = useLocation().state;

    return (
        <>
            <div className="text-center text-light fs-2">Options for category: {category.categoryName}</div>
            <Form method="post" className="text-end mx-2 my-3">
                <input type="text" name="id" value={category.id} hidden />
                <button type="submit" className="btn btn-danger bi bi-trash">Delete category</button>
            </Form>
            <Form method="post" id="newCategoryForm" className="m-2 p-2 text-light">
                <input type="text" value={category.id} name="id" hidden />
                <div className="mb-3">
                    <label htmlFor="categoryNameInput" className="form-label">Category name: </label>
                    <input type="text" className="form-control" id="categoryNameInput" name="categoryName" defaultValue={category.categoryName} required maxLength={20} />
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryDescriptionInput" className="form-label">Category description</label>
                    <textarea className="form-control" id="categoryDescriptionInput" name="description" rows="2" defaultValue={category.description}></textarea>
                </div>
                <div className="text-end">
                    <button type="submit" className="btn btn-primary bi bi-floppy"> Save changes</button>
                </div>
            </Form>
            
        </>
    )
};

export default CategoryOptionsPage;