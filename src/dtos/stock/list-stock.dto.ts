import z from 'zod';
import { DTO } from '../dto';
import { StockSchema } from './stock.schema';

export const ListStockByLocationSchema = StockSchema.omit({
  location: true,
})

export type ListStocknByLocationType = z.infer<typeof ListStockByLocationSchema>

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