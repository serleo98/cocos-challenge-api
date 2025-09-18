import { Instrument } from "../../domain/entities/instrument.entity";
import { InstrumentDto } from "../dtos/instrument.dto";

export class InstrumentMapper {
  static toDto(instrument: Instrument): InstrumentDto {
    return new InstrumentDto(
      instrument.getId(),
      instrument.getTicker(),
      instrument.getName(),
      instrument.getType()
    );
  }

  static toDtoList(instruments: Instrument[]): InstrumentDto[] {
    return instruments.map(instrument => this.toDto(instrument));
  }
}
