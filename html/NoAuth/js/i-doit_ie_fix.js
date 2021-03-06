%# RT::Extension::ReferenceIDoitObjects
%#
%# Copyright (C) 2011-14 synetics GmbH, <http://i-doit.org/>
%#
%# This program is free software: you can redistribute it and/or modify
%# it under the terms of the GNU Affero General Public License as
%# published by the Free Software Foundation, either version 3 of the
%# License, or (at your option) any later version.
%#
%# This program is distributed in the hope that it will be useful,
%# but WITHOUT ANY WARRANTY; without even the implied warranty of
%# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
%# GNU Affero General Public License for more details.
%#
%# You should have received a copy of the GNU Affero General Public License
%# along with this program.  If not, see <http://www.gnu.org/licenses/>.
%#
%# Request Tracker (RT) is Copyright Best Practical Solutions, LLC.

/**
 * JSON object is missing in IE <= 8.
 */
var JSON = JSON || {};

/**
 * Implements JSON.stringify serialization.
 */
JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t !== "object" || obj === null) {
        // Simple data type
        if (t === "string")
            obj = '"' + obj + '"';
        return String(obj);
    } else {
        // Recurse array or object:
        var n, v, json = [], arr = (obj && obj.constructor === Array);
        for (n in obj) {
            v = obj[n];
            t = typeof (v);
            if (t === "string")
                v = '"' + v + '"';
            else if (t === "object" && v !== null)
                v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};
