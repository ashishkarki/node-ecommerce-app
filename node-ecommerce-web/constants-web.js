export const URLs = {
    PRODUCTS: `/api/v1/ecommerce/products/`,
    CATEGORIES: `/api/v1/ecommerce/categories/`,
}

export const ACTIONS = {
    DELETE: 'delete',
    EDIT: 'edit',
    NONE: 'none',
}

export const CATEGORIES_TABLE_COLUMNS = [
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
