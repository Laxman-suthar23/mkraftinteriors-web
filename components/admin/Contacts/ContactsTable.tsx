"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, Eye, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContactSubmission } from "@/types";
import { formatDate } from "@/lib/utils";
import ContactActions from "./ContactActions";

interface ContactsTableProps {
  contacts: ContactSubmission[];
  onUpdate: () => void;
}

export default function ContactsTable({ contacts, onUpdate }: ContactsTableProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new": return "default";
      case "contacted": return "secondary";
      case "closed": return "outline";
      default: return "outline";
    }
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  if (contacts.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
        <p className="text-muted-foreground">
          Contact submissions will appear here when received.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Project Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">
                {contact.name}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{contact.email}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEmailClick(contact.email)}
                    className="h-6 w-6 p-0"
                  >
                    <Mail className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                {contact.phone ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{contact.phone}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePhoneClick(contact.phone!)}
                      className="h-6 w-6 p-0"
                    >
                      <Phone className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">—</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {contact.projectType}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(contact.status)}>
                  {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(contact.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Link href={`/admin/contacts/${contact.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <ContactActions contact={contact} onUpdate={onUpdate} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
