#!/usr/bin/env python
# Module handling routing of requests from Flask app

import json
from flask import request, current_app as app
from src.modules.sessionhandler import SessionHandler

def _route_request() -> str: # /api/login/
    """
    GET
    Routes request to session handler
    """
    body: dict = request.json
    if "username" not in body: return [False, "no username provided"]
    return json.dumps(SessionHandler.route_request(body["username"], body["query"]), default=str)


routes: dict = {
    "/api/post": [_route_request, 'POST'],
    "/api/get": [_route_request, 'GET'],
}

def create_routes():
    """
    Create url rules and add to app
    """
    SessionHandler.initialize()
    gets_text: str = "<b>GET METHODS</b>\n"
    posts_test: str = "<b>POST METHODS</b>\n"

    for name, value in routes.items():
        if value[1] == 'GET':
            gets_text += (name + "\n")
        else:
            posts_test += (name + "\n")

    final_text: str = gets_text + "\n\n" + posts_test
    for page_name in routes:
        with app.app_context():
            @app.errorhandler(404)
            def _error_endpoint(error) -> str:
                return f"{error}\n\n{final_text}"
            app.add_url_rule(page_name, view_func=routes[page_name][0], methods=[routes[page_name][1]])