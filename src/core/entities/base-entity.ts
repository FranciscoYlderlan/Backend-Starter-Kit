import { UniqueID } from '@/domain/users/enterprise/entities/value-objects/unique-id';
import { Optional } from '../types/optional';
interface PropertyBase {
  id?: UniqueID;
}
export abstract class BaseEntity<Property extends PropertyBase> {
  private id: UniqueID;
  protected props: Omit<Property, 'id'>;

  protected constructor(props: Optional<Property, 'id'>) {
    const { id, ...restProps } = props;

    this.id = id ?? UniqueID.transform({});
    this.props = restProps as Omit<Property, 'id'>;
  }

  public getId(): UniqueID {
    return this.id;
  }
}
