
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface InsightPanelProps {
  summary?: string;
  insights: string[];
  topics?: string[];
}

const InsightPanel: React.FC<InsightPanelProps> = ({
  summary = "No conversation data available yet.",
  insights = [],
  topics = [],
}) => {
  return (
    <div className="w-full space-y-4 py-4">
      {/* Summary Card */}
      <Card className="bg-white/80 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Conversation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {summary}
          </p>
        </CardContent>
      </Card>

      {/* Insights Card */}
      <Card className="bg-white/80 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {insights.length > 0 ? (
            <ul className="space-y-2">
              {insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-echo-purple flex items-center justify-center flex-shrink-0 text-xs text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm">{insight}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No insights generated yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Topics Card */}
      {topics.length > 0 && (
        <Card className="bg-white/80 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Topics Discussed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary rounded-full text-xs shadow-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InsightPanel;
