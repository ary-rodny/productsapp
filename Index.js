const table = document.querySelector('#table-products')
const productsCount = document.querySelector('.products-count')
const keyProducts = 'productsapp.products'
let products = JSON.parse(localStorage.getItem(keyProducts)) || []
let id = 0

//#region classes
class Product{
    constructor(id,name,description,price){
        this.id = id
        this.name = name
        this.description = description
        this.price = price
    }

    /**
     * Adds a new product
     */
    add(){
       if(this.name !== '' || this.price.toString().length !== 0){
            const p = 
            {
                id:this.id, 
                name:this.name, 
                description:this.description, 
                price:this.price
            }

            products.push(p)
            localStorage.setItem(keyProducts,JSON.stringify(products));
       }
    }

    /**
     * Delete a product
     * @param {number} id The id of the product to delete
     * 
     */
    delete(id){
        products = products.filter(prod => prod.id != id);
        localStorage.setItem(keyProducts,JSON.stringify(products));
    }


    /** Returns the total count of products */
    get count(){
        return products.length;
    }

   
}

class UI{

    /**
     * Display all the products in a table
     */
    displayProducts(){
        table.innerHTML = "";
        table.className = 'table table-bordered'
        const thead = document.createElement('tr');
        thead.innerHTML = `
            <tr>
            <th>Id</th><th>Name</th><th>Description</th><th>Price</th>
            <th colspan="2" class="text-center" >Action</th>
            </tr>`
        table.appendChild(thead)

        if(products.length !==0){

            products.forEach( product => {
                const row = document.createElement('tr')
                const tr = `     
                        <td> ${product.id}</td>
                        <td> ${product.name} </td>
                        <td> ${product.description} </td>
                        <td> ${parseFloat(product.price).toFixed(2)} </td>
                        
                        <td><a data-id="${product.id}" href="" style="color: #fff;background-color:red;  padding:3px .5rem" class="btn btn  btn-sm">Delete</a></td>`
                
                row.innerHTML = tr;
                table.appendChild(row);
            })
        }
    }

    /**
     * Send a message to the user after performing an operation
     * @param {string} message The message
     * @param {string} bs_class The bootstrap class to use for the alert Ex: success
     */
    response(message, bs_class){
        const div = document.createElement('div')
        div.className = `container message alert alert-${bs_class} mt-3`
        div.appendChild(document.createTextNode(message)) 
        const sectionContainer = document.querySelector('.section-container')
        const mainContainer = document.querySelector('.main-container');
        mainContainer.insertBefore(div,sectionContainer )

        setTimeout(() => {
            mainContainer.removeChild(div)
        },3000)

    }


    /**
     * Clean the form
     */
    resetForm(){
       const form = document.querySelector('#form-product')
       form.reset();
    }

    updateProductCount(){
        productsCount.textContent = products.length
    }
}
//#endregion


const ui = new UI();
const prod = new Product();
productsCount.textContent = prod.count
ui.displayProducts()




// handle form submit
const formProduct = document.querySelector('#form-product')
formProduct.addEventListener('submit',(e) => {
    e.preventDefault()
    id = (products.length != 0 ) ? products[products.length -1].id + 1 : 1
    const name = document.querySelector('#name').value
    const description = document.querySelector('#description').value
    const price = parseFloat(document.querySelector('#price').value).toFixed(2)
    if(name.length == 0 || price.toString().length==0){
        ui.response('Please enter a name and a price','danger')
         return
     }
    //  return console.log(id)
    const product = new Product(id,name,description,price)
    product.add()
    ui.response('Product added successfully','success')
    ui.resetForm()
    ui.updateProductCount()
    ui.displayProducts()
  
    
})




//handel delete product
table.addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.dataset.id !== undefined){
        const p = new Product();
        p.delete(e.target.dataset.id);
        ui.response('Product deleted successfully','success')
        ui.displayProducts();
       ui.updateProductCount();
    }
})





