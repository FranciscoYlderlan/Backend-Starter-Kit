import { randomUUID } from "node:crypto"

export abstract class BaseEntity<Property> {
  private id: string
  protected props: Property
  
  constructor(props: Property,id?: string) {
    this.props = props
    this.id = id ?? randomUUID()
  }
  
  public getId(): string {
    return this.id
  }
}