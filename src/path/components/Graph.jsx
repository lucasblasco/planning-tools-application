import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactECharts from "echarts-for-react";
import { SEPARATION_OVERFLOW } from "../constants";

export const Graph = ({ allPaths, activities, links }) => {
  const [nodes, setNodes] = useState([]);

  const getData = (paths) => {
    if (!paths || paths.length === 0) {
      return [];
    }

    const graphLarge = paths[0].length;
    const pathCount = paths.length;
    const nodes = [];
    let x = 100;
    for (let i = 0; i < graphLarge; i++) {
      const levelNodes = [];
      for (let y = 0; y < pathCount; y++) {
        if (paths[y][i] && !levelNodes.includes(paths[y][i])) {
          levelNodes.push(paths[y][i]);
        }
      }
      const separation = SEPARATION_OVERFLOW[levelNodes.length];

      for (let y = 0; y < levelNodes.length; y++) {
        const node = {
          name: levelNodes[y],
          x,
          y: separation * (y + 1),
        };
        if (nodes.filter((n) => n.name === node.name).length === 0) {
          nodes.push(node);
        }
      }
      x += 200;
    }

    setNodes(nodes);
  };

  useEffect(() => {
    getData(allPaths);
  }, [allPaths]);

  var showTooltip = (args) => {
    const currentName = args.data.name;
    const activity = activities.find((act) => act.name === currentName);
    if (!activity) {
      return;
    }
    return `<ul style="list-style-type: none;padding: 0">
                <li>Tiempo de inicio temprano (ES): <b>${activity.earlyStart}</b></li>
                <li>Tiempo de terminación temprano (EF): <b>${activity.earlyFinish}</b></li>
                <li>Tiempo de inicio más lejano (LS): <b>${activity.lateStart}</b></li>
                <li>Tiempo de terminación más lejana (LF): <b>${activity.lateFinish}</b></li>
                <li>Holgura (H): <b>${activity.freeFloat}</b></li>
            </ul>`;
  };

  const options = {
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        type: "graph",
        layout: "none",
        symbolSize: 50,
        roam: true,
        tooltip: {
          trigger: "item",
          formatter: showTooltip,
        },
        label: {
          show: true,
        },
        edgeSymbol: ["circle", "arrow"],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20,
        },
        data: nodes,
        links: links.map((link) => ({ source: link[0], target: link[1] })),
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0,
        },
      },
    ],
  };

  return <ReactECharts option={options} />;
};

Graph.propTypes = {
  allPaths: PropTypes.array,
  activities: PropTypes.array,
};
