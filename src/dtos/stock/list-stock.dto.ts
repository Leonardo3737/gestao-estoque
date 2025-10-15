import z from 'zod';
import { DTO } from '../dto';
import { StockSchema } from './stock.schema';
import { ResponseSchema } from '../util/response.schema';

export const ListStockSchema = StockSchema

export type ListStockType = z.infer<typeof ListStockSchema>

export class ListStockDTO extends DTO<typeof ListStockSchema> {
  protected rules() {
    return ListStockSchema
  }
}

export const ListStocksSchema = ResponseSchema(StockSchema)

export type ListStocksType = z.infer<typeof ListStocksSchema>

export class ListStocksDTO extends DTO<typeof ListStocksSchema> {
  protected rules() {
    return ListStocksSchema
  }
}

export const ListStockByLocationSchema = StockSchema.omit({
  location: true,
})

export type ListStockByLocationType = z.infer<typeof ListStockByLocationSchema>

export class ListStockByLocationDTO extends DTO<typeof ListStockByLocationSchema> {
  protected rules() {
    return ListStockByLocationSchema
  }
}

export const ListStockByProductSchema = StockSchema.omit({
  product: true,
})

export type ListStockByProductType = z.infer<typeof ListStockByProductSchema>

export class ListStockByProductDTO extends DTO<typeof ListStockByProductSchema> {
  protected rules() {
    return ListStockByProductSchema
  }
}

