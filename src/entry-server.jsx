import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {AppRoutes} from './App';
export function render(path) { return renderToString(<StaticRouter location={path}><AppRoutes /></StaticRouter>); }
