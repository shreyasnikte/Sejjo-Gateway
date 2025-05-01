import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Paper,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Share as ShareIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

interface ProjectNode {
  id: string;
  name: string;
  type: 'folder' | 'project';
  children?: ProjectNode[];
  description?: string;
  flowCount?: number;
  lastModified?: string;
}

// Mock data for projects with folder structure
const mockProjectTree: ProjectNode[] = [
  {
    id: 'folder1',
    name: 'Marketing',
    type: 'folder',
    children: [
      {
        id: 'folder1/folder2',
        name: 'Campaigns',
        type: 'folder',
        children: [
          {
            id: 'folder1/folder2/project1',
            name: 'Project Alpha',
            type: 'project',
            description: 'Main automation project for marketing workflows',
            flowCount: 12,
            lastModified: '2024-03-15',
          }
        ]
      }
    ]
  },
  {
    id: 'folder1/project2',
    name: 'Project Beta',
    type: 'project',
    description: 'Customer support automation flows',
    flowCount: 8,
    lastModified: '2024-03-14',
  }
];

function ProjectTreeItem({ node, level = 0, onSelect }: { 
  node: ProjectNode; 
  level?: number;
  onSelect: (node: ProjectNode) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded);
    }
    onSelect(node);
  };

  return (
    <>
      <ListItem 
        disablePadding 
        sx={{ pl: level * 2 }}
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            {node.type === 'folder' ? (
              isExpanded ? <ExpandMoreIcon sx={{ color: 'text.secondary' }} /> : <ChevronRightIcon sx={{ color: 'text.secondary' }} />
            ) : (
              <FileIcon sx={{ color: 'text.secondary' }} />
            )}
          </ListItemIcon>
          {node.type === 'folder' && (
            <ListItemIcon sx={{ minWidth: 40 }}>
              <FolderIcon sx={{ color: 'text.secondary' }} />
            </ListItemIcon>
          )}
          <ListItemText primary={node.name} />
        </ListItemButton>
      </ListItem>
      {node.type === 'folder' && isExpanded && node.children && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {node.children.map((child) => (
              <ProjectTreeItem
                key={child.id}
                node={child}
                level={level + 1}
                onSelect={onSelect}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<ProjectNode | null>(null);

  const handleNodeSelect = (node: ProjectNode) => {
    if (node.type === 'project') {
      setSelectedNode(node);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        pr: selectedNode?.type === 'project' ? '400px' : 0,
        transition: 'padding-right 0.3s ease'
      }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextField
              placeholder="Search projects..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {/* Handle new project creation */}}
            >
              New Project
            </Button>
          </Box>
        </Box>

        <Paper sx={{ 
          flex: 1,
          overflow: 'auto',
          bgcolor: 'background.default',
          borderRadius: 0
        }}>
          <List>
            {mockProjectTree.map((node) => (
              <ProjectTreeItem
                key={node.id}
                node={node}
                onSelect={handleNodeSelect}
              />
            ))}
          </List>
        </Paper>
      </Box>

      {/* Project Details Panel */}
      <Paper sx={{ 
        position: 'absolute',
        top: 0,
        right: 0,
        width: '400px',
        height: '100%',
        borderRadius: 0,
        borderLeft: 1,
        borderColor: 'divider',
        transform: selectedNode?.type === 'project' ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default'
      }}>
        {selectedNode?.type === 'project' ? (
          <>
            <Box sx={{ 
              p: 3,
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper'
            }}>
              <Typography variant="h6" gutterBottom>
                {selectedNode.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedNode.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Flows: {selectedNode.flowCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last modified: {selectedNode.lastModified}
              </Typography>
            </Box>
            <Box sx={{ 
              p: 2, 
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              display: 'flex',
              gap: 1
            }}>
              <Button size="small" variant="contained">Open</Button>
              <IconButton size="small">
                <SettingsIcon sx={{ color: 'text.secondary' }} />
              </IconButton>
              <IconButton size="small">
                <ShareIcon sx={{ color: 'text.secondary' }} />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 3,
            textAlign: 'center'
          }}>
            <Box>
              <FileIcon sx={{ 
                fontSize: 48, 
                color: 'text.disabled',
                mb: 2
              }} />
              <Typography variant="body1" color="text.secondary" gutterBottom>
                No Project Selected
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Select a project from the tree to view its details
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
} 