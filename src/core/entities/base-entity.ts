import { UniqueID } from '@/domain/users/enterprise/entities/value-objects/unique-id';

export abstract class BaseEntity<Property> {
  private id: UniqueID;
  protected props: Property;

  protected constructor(props: Property, id?: UniqueID) {
    this.props = props;
    this.id = id ?? UniqueID.transform({});
  }

  public getId(): UniqueID {
    return this.id;
  }
}
