using Core.Entities;

namespace Core.Specifications;

public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
{
    public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productSpecParams)
        : base(
            x =>
                (
                    string.IsNullOrEmpty(productSpecParams.Search)
                    || x.Name.ToLower().Contains(productSpecParams.Search)
                )
                && (
                    !productSpecParams.BrandId.HasValue
                    || x.ProductBrandId == productSpecParams.BrandId
                )
                && (
                    !productSpecParams.TypeId.HasValue
                    || x.ProductTypeId == productSpecParams.TypeId
                )
        )
    {
        AddInclude(x => x.ProductType);
        AddInclude(x => x.ProductBrand);
        AddOrderBy(x => x.Name);
        AddPaging(
            productSpecParams.PageSize * (productSpecParams.PageIndex - 1),
            productSpecParams.PageSize
        );
        if (!string.IsNullOrEmpty(productSpecParams.Sort))
        {
            switch (productSpecParams.Sort)
            {
                case "priceAscending":
                    AddOrderBy(p => p.Price);
                    break;
                case "priceDescending":
                    AddOrderByDescending(p => p.Price);
                    break;
                default:
                    AddOrderBy(n => n.Name);
                    break;
            }
        }
    }

    public ProductsWithTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.ProductType);
        AddInclude(x => x.ProductBrand);
    }
}
