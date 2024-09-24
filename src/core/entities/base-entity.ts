import { UniqueID } from '@/domain/users/enterprise/entities/value-objects/unique-id';
interface PropertyBase {
  id?: UniqueID;
}
export abstract class BaseEntity<Property extends PropertyBase> {
  private id: UniqueID;
  protected props: Omit<Property, 'id'>;

  protected constructor(props: Property) {
    const { id, ...restProps } = props;

    this.id = id ?? UniqueID.transform({});
    this.props = restProps;
  }

  public getId(): UniqueID {
    return this.id;
  }
}
