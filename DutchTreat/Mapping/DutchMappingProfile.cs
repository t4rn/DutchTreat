using AutoMapper;
using DutchTreat.Data.Entities;
using DutchTreat.ViewModels;

namespace DutchTreat.Mapping
{
    public class DutchMappingProfile : Profile
    {
        public DutchMappingProfile()
        {
            CreateMap<Order, OrderViewModel>()
                .ForMember(ovm => ovm.OrderId, ex => ex.MapFrom(o => o.Id))
                .ReverseMap();

            CreateMap<OrderItem, OrderItemViewModel>()
                .ReverseMap();
        }
    }
}
