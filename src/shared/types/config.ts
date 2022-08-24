import { RouteObject } from 'react-router-dom'

// import { Slice, SliceCaseReducers } from '@reduxjs/toolkit'

export interface AppModule {
  // <
  //   State = any,
  //   CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  //   Name extends string = string
  // > {
  // slice: Slice<State, CaseReducers, Name>
  routes: RouteObject[]
  name: string
}
