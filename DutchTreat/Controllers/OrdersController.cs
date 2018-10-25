using AutoMapper;
using DutchTreat.Data;
using DutchTreat.Data.Entities;
using DutchTreat.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace DutchTreat.Controllers
{
    [Route("api/[Controller]")]
    public class OrdersController : Controller
    {
        private readonly IDutchRepository _repository;
        private readonly ILogger<ProductsController> _logger;
        private readonly IMapper _mapper;

        public OrdersController(IDutchRepository dutchRepository, ILogger<ProductsController> logger, IMapper mapper)
        {
            _repository = dutchRepository;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get(bool includeItems = true)
        {
            try
            {
                var results = _repository.GetAllOrders(includeItems);
                return Ok(_mapper.Map<IEnumerable<Order>, IEnumerable<OrderViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get orders: {ex}");
                return BadRequest($"Failed to get orders: {ex.Message}");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var order = _repository.GetOrderById(id);

                if (order != null) return Ok(_mapper.Map<Order, OrderViewModel>(order));
                else return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get order with id: {id}: {ex}");
                return BadRequest($"Failed to get order with id: {id}: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]OrderViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newOrder = _mapper.Map<OrderViewModel, Order>(model);

                    if (newOrder.OrderDate == DateTime.MinValue)
                        newOrder.OrderDate = DateTime.Now;

                    _repository.AddEntity(newOrder);
                    if (_repository.SaveAll())
                    {
                        return Created($"/api/orders/{newOrder.Id}", _mapper.Map<Order, OrderViewModel>(newOrder));
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new order: {ex}");
            }

            return BadRequest("Failed to save new order");
        }
    }
}
