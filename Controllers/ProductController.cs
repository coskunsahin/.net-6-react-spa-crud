using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project2.Models;
using ProjectVM.Models;

namespace Project2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly TestContext _dbContext;

        public ProductController(TestContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        [Route("liste")]
        public IActionResult liste()
        {
             
                var product = _dbContext.Products.Select(x => new { name = x.ProductName, quantity = x.QuantityPerUnit, price = x.UnitPrice, id = x.ProductId, supplierId = x.SupplierId, instock=x.UnitsInStock
                }).ToList();
                return StatusCode(StatusCodes.Status200OK, product);

        }
        [HttpPost]
        [Route("save")] //GUARDAR
        public async Task<IActionResult> Save([FromBody] ProductVM pr)
        {

            var product = new Product
            {
                ProductName = pr.name,
                UnitPrice = pr.price,
                QuantityPerUnit = pr.quantity,
                SupplierId = pr.supplierId,
                UnitsInStock = pr.inStock


            };
        await _dbContext.Products.AddAsync(product);
            await _dbContext.SaveChangesAsync();
             return StatusCode(StatusCodes.Status200OK, "Ok"); 
        }
        [HttpPut("Edit")]
        public async Task<IActionResult> Edit([FromBody] ProductVM pr)
        {
            try
            {
                var product = _dbContext.Products.Find(pr.id);

                product.ProductName = pr.name;
           product.UnitPrice = pr.price;
                product.QuantityPerUnit = pr.quantity;
                product.SupplierId = pr.supplierId; 
                product.UnitsInStock = pr.inStock;


                await _dbContext.SaveChangesAsync();
                return Ok(product);
            }
            catch
            {
                return BadRequest();
            }
        }





        //[HttpPut]
        //[Route("Edit")] //GUARDAR
        //public async Task<IActionResult> Edit([FromBody] ProductVM pr)
        //{

        //    var product = new Product
        //    {
        //        ProductName = pr.name,
        //        UnitPrice = pr.price,
        //        QuantityPerUnit = pr.quantity,
        //        SupplierId = pr.supplierId,
        //        UnitsInStock = pr.inStock


        //    };
        //     _dbContext.Products.Update(product);
        //    await _dbContext.SaveChangesAsync();
        //    return StatusCode(StatusCodes.Status200OK, "Ok");
        //}
        [HttpDelete]
        [Route("close/{id:int}")]//gerrar
        public async Task<IActionResult> Close(int id)
        {

            var product = _dbContext.Products.Find(id);
            _dbContext.Products.Remove(product);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Ok");
        }
    }
}
