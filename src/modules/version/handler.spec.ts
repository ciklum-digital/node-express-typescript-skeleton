import { Request, Response, NextFunction } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import { nextMock } from '../../shared/utils';

const packageWithData = () => {
  jest.mock('../../../package.json', () => ({
    __esModule: true,
    name: 'ft-svc',
    version: '0.0.2',
  }));
};
const packageWitEmptyData = () => {
  jest.mock(
    '../../../package.json',
    () => ({
      __esModule: true,
    }),
    { virtual: true }
  );
};

describe('version handler', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;
  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    next = () => nextMock();
    jest.resetModules();
  });
  it('get method should add version title to body', async () => {
    packageWithData();
    const { versionHandler } = await import('./handler');
    await versionHandler.get(req, res, next);
    expect(res.body).toEqual('ft-svc:0.0.2');
  });
  it('get method should return status 200', async () => {
    packageWithData();
    const { versionHandler } = await import('./handler');
    await versionHandler.get(req, res, next);
    expect(res.statusCode).toEqual(HttpStatusCodes.OK);
  });
  it('get method should return default values in case if nothing provided', async () => {
    await packageWitEmptyData();
    const { versionHandler } = await import('./handler');
    await versionHandler.get(req, res, next);
    expect(res.body).toEqual('not specified:not specified');
  });
});
