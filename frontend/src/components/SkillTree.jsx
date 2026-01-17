import { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Code, Brain, Rocket, Database, 
  Shield, Cloud, Smartphone, Globe,
  Zap, Lock, Palette, Server,
  ChevronRight, Target, TrendingUp
} from 'lucide-react';

const nodeTypes = {
  default: ({ data }) => (
    <div className="skill-node">
      <div className="node-content">
        {data.icon}
        <h3>{data.label}</h3>
        <p>{data.description}</p>
        {data.completed && (
          <div className="completion-badge">✓ Completed</div>
        )}
      </div>
    </div>
  ),
  milestone: ({ data }) => (
    <div className="milestone-node">
      <div className="milestone-content">
        <div className="milestone-icon">{data.icon}</div>
        <h4>{data.label}</h4>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${data.progress}%` }}
          ></div>
        </div>
        <span className="progress-text">{data.progress}%</span>
      </div>
    </div>
  )
};

const edgeTypes = {
  default: {
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#4f46e5', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#4f46e5'
    }
  },
  optional: {
    type: 'step',
    style: { stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '5,5' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#9ca3af'
    }
  }
};

const SkillTree = ({ roadmapData, userSkills = [] }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [viewMode, setViewMode] = useState('graph'); // 'graph' or 'timeline'

  // Generate nodes and edges from roadmap data
  const generateSkillTree = useCallback((roadmap) => {
    if (!roadmap) return;

    const newNodes = [];
    const newEdges = [];
    let xPosition = 0;
    let yPosition = 0;
    const horizontalSpacing = 300;
    const verticalSpacing = 150;

    // Create foundation nodes
    const foundationNode = {
      id: 'foundation',
      type: 'default',
      position: { x: 0, y: 0 },
      data: {
        label: 'Foundation Skills',
        description: 'Core programming and CS fundamentals',
        icon: <Code className="w-6 h-6" />,
        level: 'beginner',
        completed: userSkills.includes('programming')
      }
    };
    newNodes.push(foundationNode);

    // Generate nodes for each month
    roadmap.forEach((month, monthIndex) => {
      const monthX = (monthIndex + 1) * horizontalSpacing;
      
      // Month header node
      const monthNode = {
        id: `month-${monthIndex}`,
        type: 'milestone',
        position: { x: monthX, y: 0 },
        data: {
          label: `Month ${monthIndex + 1}`,
          description: month.theme || 'Learning Phase',
          icon: <Target className="w-4 h-4" />,
          progress: Math.min((monthIndex + 1) * 100 / roadmap.length, 100)
        }
      };
      newNodes.push(monthNode);

      // Skill nodes for this month
      month.milestones.forEach((milestone, skillIndex) => {
        const nodeId = `skill-${monthIndex}-${skillIndex}`;
        const skillName = milestone.toLowerCase();
        const isCompleted = userSkills.some(skill => 
          skillName.includes(skill.toLowerCase()) || 
          skill.toLowerCase().includes(skillName)
        );

        newNodes.push({
          id: nodeId,
          type: 'default',
          position: { 
            x: monthX, 
            y: (skillIndex + 1) * verticalSpacing 
          },
          data: {
            label: milestone,
            description: `Month ${monthIndex + 1} skill`,
            icon: getSkillIcon(milestone),
            level: getSkillLevel(monthIndex),
            completed: isCompleted,
            resources: getSkillResources(milestone)
          }
        });

        // Connect to previous month or foundation
        if (monthIndex === 0) {
          newEdges.push({
            id: `edge-foundation-${nodeId}`,
            source: 'foundation',
            target: nodeId,
            type: 'default'
          });
        } else {
          // Connect to random previous skill for demo
          const prevSkillIndex = Math.floor(Math.random() * roadmap[monthIndex - 1].milestones.length);
          const prevNodeId = `skill-${monthIndex - 1}-${prevSkillIndex}`;
          
          newEdges.push({
            id: `edge-${prevNodeId}-${nodeId}`,
            source: prevNodeId,
            target: nodeId,
            type: 'default'
          });
        }

        // Connect to month header
        newEdges.push({
          id: `edge-month-${monthIndex}-${nodeId}`,
          source: `month-${monthIndex}`,
          target: nodeId,
          type: 'optional'
        });
      });
    });

    // Add final goal node
    const goalX = (roadmap.length + 1) * horizontalSpacing;
    const goalNode = {
      id: 'goal',
      type: 'default',
      position: { x: goalX, y: 0 },
      data: {
        label: 'Career Goal Achieved',
        description: 'Ready for target role',
        icon: <TrendingUp className="w-6 h-6" />,
        level: 'expert'
      }
    };
    newNodes.push(goalNode);

    // Connect last month's skills to goal
    const lastMonthIndex = roadmap.length - 1;
    roadmap[lastMonthIndex].milestones.forEach((_, skillIndex) => {
      const lastNodeId = `skill-${lastMonthIndex}-${skillIndex}`;
      newEdges.push({
        id: `edge-${lastNodeId}-goal`,
        source: lastNodeId,
        target: 'goal',
        type: 'default'
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [userSkills]);

  // Helper functions
  const getSkillIcon = (skill) => {
    const skillLower = skill.toLowerCase();
    if (skillLower.includes('react') || skillLower.includes('frontend')) {
      return <Smartphone className="w-6 h-6" />;
    } else if (skillLower.includes('node') || skillLower.includes('backend')) {
      return <Server className="w-6 h-6" />;
    } else if (skillLower.includes('python') || skillLower.includes('ml')) {
      return <Brain className="w-6 h-6" />;
    } else if (skillLower.includes('database')) {
      return <Database className="w-6 h-6" />;
    } else if (skillLower.includes('security')) {
      return <Shield className="w-6 h-6" />;
    } else if (skillLower.includes('aws') || skillLower.includes('cloud')) {
      return <Cloud className="w-6 h-6" />;
    } else if (skillLower.includes('web')) {
      return <Globe className="w-6 h-6" />;
    } else if (skillLower.includes('mobile')) {
      return <Smartphone className="w-6 h-6" />;
    } else if (skillLower.includes('design')) {
      return <Palette className="w-6 h-6" />;
    }
    return <Code className="w-6 h-6" />;
  };

  const getSkillLevel = (monthIndex) => {
    if (monthIndex < 2) return 'beginner';
    if (monthIndex < 4) return 'intermediate';
    if (monthIndex < 6) return 'advanced';
    return 'expert';
  };

  const getSkillResources = (skill) => {
    // Return relevant learning resources for each skill
    const resources = {
      python: ['Python.org', 'Real Python', 'Coursera'],
      react: ['React Docs', 'Next.js', 'Chakra UI'],
      nodejs: ['Node.js Docs', 'Express.js', 'Mongoose'],
      database: ['MongoDB University', 'PostgreSQL Docs'],
      aws: ['AWS Training', 'AWS Docs', 'Cloud Guru']
    };
    
    const skillLower = skill.toLowerCase();
    for (const [key, value] of Object.entries(resources)) {
      if (skillLower.includes(key)) {
        return value;
      }
    }
    return ['Official Documentation', 'YouTube Tutorials', 'Practice Projects'];
  };

  // Initialize skill tree when component mounts or roadmap changes
  useState(() => {
    if (roadmapData) {
      generateSkillTree(roadmapData);
    }
  }, [roadmapData, generateSkillTree]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="skill-tree-container">
      {/* Controls */}
      <div className="controls-panel">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setViewMode('graph')}
            className={`px-4 py-2 rounded-lg transition-all ${
              viewMode === 'graph'
                ? 'bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Graph View
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 rounded-lg transition-all ${
              viewMode === 'timeline'
                ? 'bg-gradient-to-r from-midnight-primary to-midnight-secondary text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Timeline View
          </button>
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Completed Skill</span>
          </div>
          <div className="legend-item">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Current Focus</span>
          </div>
          <div className="legend-item">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span>Upcoming Skill</span>
          </div>
        </div>
      </div>

      {/* React Flow Graph */}
      <div className="skill-tree-graph">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background color="#4a5568" gap={16} />
          <Controls className="bg-white/10 backdrop-blur-sm rounded-lg" />
          <MiniMap 
            className="bg-black/50 backdrop-blur-sm rounded-lg"
            nodeStrokeColor={(n) => {
              if (n.data?.completed) return '#10b981';
              if (n.type === 'milestone') return '#8b5cf6';
              return '#4f46e5';
            }}
            nodeColor={(n) => {
              if (n.data?.completed) return '#10b98120';
              if (n.type === 'milestone') return '#8b5cf620';
              return '#4f46e520';
            }}
          />
        </ReactFlow>
      </div>

      {/* Stats Panel */}
      <div className="stats-panel">
        <div className="stat-card">
          <h4>Total Skills</h4>
          <div className="text-3xl font-bold">{nodes.filter(n => n.type === 'default').length}</div>
        </div>
        <div className="stat-card">
          <h4>Completed</h4>
          <div className="text-3xl font-bold text-green-400">
            {nodes.filter(n => n.data?.completed).length}
          </div>
        </div>
        <div className="stat-card">
          <h4>Estimated Time</h4>
          <div className="text-3xl font-bold">{roadmapData?.length || 6} months</div>
        </div>
        <div className="stat-card">
          <h4>Progress</h4>
          <div className="text-3xl font-bold">
            {Math.round((nodes.filter(n => n.data?.completed).length / 
              nodes.filter(n => n.type === 'default').length) * 100) || 0}%
          </div>
        </div>
      </div>

      <style jsx>{`
        .skill-tree-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 600px;
          background: rgba(15, 23, 42, 0.7);
          border-radius: 1rem;
          padding: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .controls-panel {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .legend {
          display: flex;
          gap: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #94a3b8;
        }

        .skill-tree-graph {
          flex: 1;
          border-radius: 0.75rem;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
        }

        .stats-panel {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          padding: 1rem;
          text-align: center;
        }

        .stat-card h4 {
          font-size: 0.875rem;
          color: #94a3b8;
          margin-bottom: 0.5rem;
        }

        .skill-node {
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8));
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 0.75rem;
          padding: 1rem;
          min-width: 200px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .skill-node.completed {
          border-color: #10b981;
          background: linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.8));
        }

        .node-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .node-content h3 {
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin: 0;
        }

        .node-content p {
          font-size: 0.875rem;
          color: #94a3b8;
          margin: 0;
        }

        .completion-badge {
          display: inline-block;
          background: #10b981;
          color: white;
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          margin-top: 0.5rem;
        }

        .milestone-node {
          background: rgba(139, 92, 246, 0.2);
          border: 2px solid #8b5cf6;
          border-radius: 0.75rem;
          padding: 0.75rem;
          min-width: 150px;
        }

        .milestone-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .milestone-icon {
          background: #8b5cf6;
          color: white;
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-bar {
          width: 100%;
          height: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(to right, #4f46e5, #8b5cf6);
          border-radius: 9999px;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 0.75rem;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default SkillTree;