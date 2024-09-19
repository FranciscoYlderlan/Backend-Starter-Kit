import { randomUUID } from 'node:crypto';
import {
  BaseValueObject,
  ValueObjectProps,
} from 'src/core/entities/value-objects/base-value-object';

interface UniqueIDProps extends ValueObjectProps {
  value?: string;
}

export class UniqueID extends BaseValueObject<UniqueIDProps> {
  private constructor(uniqueID: UniqueIDProps) {
    super(uniqueID);
  }

  public static transform(props: UniqueIDProps): UniqueID {
    const uniqueID = UniqueID.generateUniqueID(props.value);
    return new UniqueID({ value: uniqueID });
  }

  private static generateUniqueID(id?: string): string {
    return id ?? randomUUID();
  }
}
