export const URLs = {
    PRODUCTS: `/api/v1/ecommerce/products/`,
    CATEGORIES: `/api/v1/ecommerce/categories/`,
}

export const ACTIONS = {
    GET_ALL: 'get all items',
    DELETE: 'delete',
    EDIT: 'edit',
    NONE: 'none',
}

// table columns
// Category table columns
export const CATEGORY_COLUMNS = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Icon',
        accessor: 'icon',
    },
    {
        Header: 'Color',
        accessor: 'color',
    },
]
