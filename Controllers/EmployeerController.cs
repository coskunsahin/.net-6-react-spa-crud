using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project2.Models;
using System.Linq;

namespace Project2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeerController : ControllerBase
    {
        private readonly TestContext _dbContext;

        public EmployeerController(TestContext dbContext)
        {
            _dbContext =dbContext;
        }
        [HttpGet]
        [Route("getall")]
        public IActionResult getall()
        {
           var  employees = _dbContext.Employees.Select(x => new {name=x.LastName,address=x.Address,country=x.Country, id=x.EmployeeId}).ToList();
            return StatusCode(StatusCodes.Status200OK, employees);
        }


    }
   

}
