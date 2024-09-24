import { UniqueID } from '@/domain/users/enterprise/entities/value-objects/unique-id';
interface PropertyBase {
  id?: UniqueID;
}
export abstract class BaseEntity<Property extends PropertyBase> {
  private id: UniqueID;
  protected props: Property;

  protected constructor(props: Property) {
    this.props = props;
    this.id = props.id ?? UniqueID.transform({});
  }

  public getId(): UniqueID {
    return this.id;
  }
}
