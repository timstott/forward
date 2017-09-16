export interface ITinyAPIEvent {
  body: string | null;
  pathParameters: { [name: string]: string } | null;
  queryStringParameters: { [name: string]: string } | null;
}
