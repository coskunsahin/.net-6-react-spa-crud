using System;
using System.Collections.Generic;

namespace ProjectVM.Models
{
    public  class ProductVM
    {
       

        public int id { get; set; }
        public string name { get; set; } = null!;
        public int? supplierId { get; set; }

        public string? quantity { get; set; }
        public decimal? price { get; set; }
        public short? inStock { get; set; }
       
    } }

  